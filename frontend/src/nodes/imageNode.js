// imageNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const ImageNode = ({ id, data }) => {
  const [imageName, setImageName] = useState(data?.imageName || '');
  const [imageFormat, setImageFormat] = useState(data?.imageFormat || 'PNG');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    setImageName(data?.imageName || '');
  }, [data?.imageName]);

  useEffect(() => {
    setImageFormat(data?.imageFormat || 'PNG');
  }, [data?.imageFormat]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
      updateNodeField(id, 'imageName', file.name);
    }
  };

  const handleFormatChange = (value) => {
    setImageFormat(value);
    updateNodeField(id, 'imageFormat', value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Image"
      icon="🖼️"
      handles={[
        { id: 'image', type: 'source' }
      ]}
      fields={[
        {
          type: 'file',
          label: 'Upload Image',
          onChange: handleImageChange
        },
        {
          type: 'select',
          label: 'Format',
          value: imageFormat,
          onChange: handleFormatChange,
          options: [
            { value: 'PNG', label: 'PNG' },
            { value: 'JPEG', label: 'JPEG' },
            { value: 'WebP', label: 'WebP' }
          ]
        }
      ]}
    />
  );
}
