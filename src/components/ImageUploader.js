import React, { useState } from 'react';
import { useWebsite } from '../contexts/WebsiteContext';

const ImageUploader = ({ type }) => {
  const { website, updateWebsite } = useWebsite();
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        updateWebsite({ [type]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    updateWebsite({ [type]: e.target.value });
  };

  return (
    <div className="image-uploader">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <input
        type="text"
        placeholder="Or enter image URL"
        value={imageUrl}
        onChange={handleUrlChange}
      />
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`${type} preview`}
          style={{ maxWidth: '100%', maxHeight: '200px' }}
        />
      )}
    </div>
  );
};

export default ImageUploader;