import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import '../../styles/Form.css';

function ProjectForm({ onSubmit, defaultValues = {}, isEditing = false, onCancel }) {
  const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      year: new Date().getFullYear(),
      link: '',
      imageUrl: '',
      image: null,
    }
  });

  const imageUrl = watch('imageUrl');
  const imageFile = watch('image');

  // Reset form when defaultValues change
  useEffect(() => {
    if (isEditing && defaultValues) {
      setValue('title', defaultValues.title || '');
      setValue('description', defaultValues.description || '');
      setValue('category', defaultValues.category || '');
      setValue('year', defaultValues.year || new Date().getFullYear());
      setValue('link', defaultValues.link || '');
      setValue('imageUrl', defaultValues.image || '');
    } else if (!isEditing) {
      reset();
    }
  }, [defaultValues, isEditing, setValue, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    if (!isEditing) reset();
  };

  const categories = [
    { value: 'AI', label: 'AI', color: '#a78bfa' },
    { value: 'AI Automation', label: 'AI Automation', color: '#60a5fa' },
    { value: 'Web', label: 'Web Development', color: '#4ade80' },
    { value: 'Content Writing', label: 'Content Writing', color: '#fb7185' },
  ];

  return (
    <div className="form-card">
      <div className="form-card-header">
        <div className={`form-icon ${isEditing ? 'edit' : 'add'}`}>
          {isEditing ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/>
              <path d="M12 5v14"/>
            </svg>
          )}
        </div>
        <h3>{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
        <p>{isEditing ? 'Update the project details below.' : 'Create a new portfolio project.'}</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="admin-form">
        <div className="form-row two-col">
          <div className="form-field">
            <label>
              Title <span className="required">*</span>
            </label>
            <input 
              {...register('title', { required: 'Project title is required' })} 
              placeholder="e.g. E-Commerce Platform"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && (
              <span className="field-error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="form-field">
            <label>
              Year <span className="required">*</span>
            </label>
            <input 
              type="number"
              {...register('year', { 
                required: 'Year is required',
                min: { value: 2000, message: 'Year must be 2000 or later' },
                max: { value: 2100, message: 'Year must be 2100 or earlier' }
              })} 
              placeholder="2025"
              className={errors.year ? 'error' : ''}
            />
            {errors.year && (
              <span className="field-error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.year.message}
              </span>
            )}
          </div>
        </div>

        <div className="form-field">
          <label>
            Description <span className="required">*</span>
          </label>
          <textarea 
            {...register('description', { required: 'Description is required' })} 
            rows={4}
            placeholder="Describe the project, technologies used, and outcomes..."
            className={errors.description ? 'error' : ''}
          />
          {errors.description && (
            <span className="field-error">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="form-row two-col">
          <div className="form-field">
            <label>
              Category <span className="required">*</span>
            </label>
            <div className="select-wrapper">
              <select 
                {...register('category', { required: 'Please select a category' })} 
                className={errors.category ? 'error' : ''}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              <svg className="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
            {errors.category && (
              <span className="field-error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.category.message}
              </span>
            )}
          </div>

          <div className="form-field">
            <label>Project Link (optional)</label>
            <input 
              type="url"
              {...register('link')} 
              placeholder="https://github.com/username/project"
            />
          </div>
        </div>

        <div className="form-field">
          <label>Project Image</label>
          
          <div className="image-input-options">
            <div className="input-option">
              <span className="option-label">Image URL</span>
              <input
                type="url"
                placeholder="https://example.com/project-image.jpg"
                {...register('imageUrl')}
                className="url-input"
              />
            </div>
            
            <div className="option-divider">
              <span>or</span>
            </div>
            
            <div className="input-option">
              <span className="option-label">Upload File</span>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  id="project-image"
                  {...register('image')}
                  className="file-input"
                />
                <label htmlFor="project-image" className="file-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" x2="12" y1="3" y2="15"/>
                  </svg>
                  <span className="file-text">
                    {imageFile?.[0]?.name || 'Choose an image...'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Preview */}
          {(imageUrl || defaultValues.image) && !imageFile?.[0] && (
            <div className="image-preview">
              <span className="preview-label">Current Image</span>
              <div className="preview-wrapper">
                <img 
                  src={imageUrl || `http://localhost:5000${defaultValues.image}`} 
                  alt="Preview"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/200x120/1e293b/475569?text=Invalid+Image';
                  }}
                />
              </div>
            </div>
          )}
          
          {imageFile?.[0] && (
            <div className="image-preview">
              <span className="preview-label">New Image Preview</span>
              <div className="preview-wrapper">
                <img src={URL.createObjectURL(imageFile[0])} alt="Preview" />
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {isEditing ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                </svg>
                Update Project
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/>
                  <path d="M12 5v14"/>
                </svg>
                Add Project
              </>
            )}
          </button>
          
          {isEditing && (
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;