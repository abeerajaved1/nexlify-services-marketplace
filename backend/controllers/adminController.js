
// backend/controllers/adminController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/auth');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log('╔═══════════════════════════════════════╗');
  console.log('║          LOGIN ATTEMPT RECEIVED       ║');
  console.log('╚═══════════════════════════════════════╝');
  console.log('Email received     :', email);
  console.log('Password length    :', password?.length ?? 'MISSING');
  console.log('Password chars     :', password ? `[${password.split('').join(',')}]` : 'MISSING');
  console.log('Body raw           :', JSON.stringify(req.body, null, 2));

  try {
    const user = await User.findOne({ email });
    console.log('User found         :', !!user);
    if (user) {
      console.log('Stored hash prefix :', user.password.substring(0, 30) + '...');
    }

    if (!user) {
      console.log('→ No user found → returning 401');
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    console.log('Password match result :', isMatch);
    console.log('comparePassword input length :', password?.length);

    if (!isMatch) {
      console.log('→ Password did NOT match → 401');
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.cookie('refreshToken', refreshToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    console.log('→ Login SUCCESS — tokens set');
    return res.json({ success: true, message: 'Logged in successfully' });
  } catch (error) {
    console.error('Login controller crashed:', error);
    return res.status(500).json({ success: false, message: 'Server error during login' });
  }
};



exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccess = generateAccessToken(user);
    res.cookie('accessToken', newAccess, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Refresh token error:', err);
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ success: true, message: 'Logged out' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
};