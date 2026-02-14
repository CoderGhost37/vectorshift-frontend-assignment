// numberNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const NumberNode = ({ id, data }) => {
  const [number, setNumber] = useState(data?.number || 0);
  const [operation, setOperation] = useState(data?.operation || 'none');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    setNumber(data?.number || 0);
  }, [data?.number]);

  useEffect(() => {
    setOperation(data?.operation || 'none');
  }, [data?.operation]);

  const handleNumberChange = (e) => {
    const newValue = e.target.value;
    setNumber(newValue);
    updateNodeField(id, 'number', newValue);
  };

  const handleOperationChange = (value) => {
    setOperation(value);
    updateNodeField(id, 'operation', value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Number"
      icon="🔢"
      handles={[
        { id: 'input', type: 'target' },
        { id: 'output', type: 'source' }
      ]}
      fields={[
        {
          type: 'number',
          label: 'Value',
          value: number,
          onChange: handleNumberChange,
          placeholder: '0'
        },
        {
          type: 'select',
          label: 'Operation',
          value: operation,
          onChange: handleOperationChange,
          options: [
            { value: 'none', label: 'None' },
            { value: 'add', label: 'Add' },
            { value: 'multiply', label: 'Multiply' },
            { value: 'subtract', label: 'Subtract' }
          ]
        }
      ]}
    />
  );
}
