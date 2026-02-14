// inputNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    setCurrName(data?.inputName || id.replace('customInput-', 'input_'));
  }, [data?.inputName, id]);

  useEffect(() => {
    setInputType(data?.inputType || 'Text');
  }, [data?.inputType]);

  const handleNameChange = (e) => {
    const newValue = e.target.value;
    setCurrName(newValue);
    updateNodeField(id, 'inputName', newValue);
  };

  const handleTypeChange = (value) => {
    setInputType(value);
    updateNodeField(id, 'inputType', value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      icon="📥"
      handles={[
        { id: 'value', type: 'source' }
      ]}
      fields={[
        {
          type: 'text',
          label: 'Name',
          value: currName,
          onChange: handleNameChange,
          placeholder: 'input_name'
        },
        {
          type: 'select',
          label: 'Type',
          value: inputType,
          onChange: handleTypeChange,
          options: [
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' }
          ]
        }
      ]}
    />
  );
}
