import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import '../../styles/Form.css';

function ServiceForm({ onSubmit, defaultValues = {}, isEditing = false, onCancel }) {
  const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm({
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
      image: null,
    }
  });

  const imageUrl = watch('imageUrl');
  const imageFile = watch('image');

  // Reset form when defaultValues change (editing mode)
  useEffect(() => {
    if (isEditing && defaultValues) {
      setValue('name', defaultValues.name || '');
      setValue('description', defaultValues.description || '');
      setValue('imageUrl', defaultValues.image || '');
    } else if (!isEditing) {
      reset();
    }
  }, [defaultValues, isEditing, setValue, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    if (!isEditing) reset();
  };

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
        <h3>{isEditing ? 'Edit Service' : 'Add New Service'}</h3>
        <p>{isEditing ? 'Update the service details below.' : 'Create a new service offering.'}</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="admin-form">
        <div className="form-row">
          <div className="form-field">
            <label>
              Name <span className="required">*</span>
            </label>
            <input 
              {...register('name', { required: 'Service name is required' })} 
              placeholder="e.g. Web Development"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && (
              <span className="field-error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.name.message}
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
            placeholder="Describe what this service includes..."
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

        <div className="form-field">
          <label>Service Image</label>
          
          <div className="image-input-options">
            <div className="input-option">
              <span className="option-label">Image URL</span>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
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
                  id="service-image"
                  {...register('image')}
                  className="file-input"
                />
                <label htmlFor="service-image" className="file-label">
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
                Update Service
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/>
                  <path d="M12 5v14"/>
                </svg>
                Add Service
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

export default ServiceForm;