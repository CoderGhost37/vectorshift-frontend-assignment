// outputNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    setCurrName(data?.outputName || id.replace('customOutput-', 'output_'));
  }, [data?.outputName, id]);

  useEffect(() => {
    setOutputType(data?.outputType || 'Text');
  }, [data?.outputType]);

  const handleNameChange = (e) => {
    const newValue = e.target.value;
    setCurrName(newValue);
    updateNodeField(id, 'outputName', newValue);
  };

  const handleTypeChange = (value) => {
    setOutputType(value);
    updateNodeField(id, 'outputType', value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      icon="📤"
      handles={[
        { id: 'value', type: 'target' }
      ]}
      fields={[
        {
          type: 'text',
          label: 'Name',
          value: currName,
          onChange: handleNameChange,
          placeholder: 'output_name'
        },
        {
          type: 'select',
          label: 'Type',
          value: outputType,
          onChange: handleTypeChange,
          options: [
            { value: 'Text', label: 'Text' },
            { value: 'Image', label: 'Image' }
          ]
        }
      ]}
    />
  );
}
