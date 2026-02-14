// textNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    setCurrText(data?.text || '{{input}}');
  }, [data?.text]);

  const handleTextChange = (e) => {
    const newValue = e.target.value;
    setCurrText(newValue);
    updateNodeField(id, 'text', newValue);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      icon="📝"
      handles={[
        { id: 'output', type: 'source' }
      ]}
      fields={[
        {
          type: 'textarea',
          label: 'Text',
          value: currText,
          onChange: handleTextChange,
          placeholder: 'Enter text...',
          rows: 3
        }
      ]}
    />
  );
}
