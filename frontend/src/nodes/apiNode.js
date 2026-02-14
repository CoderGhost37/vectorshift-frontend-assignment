// apiNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const ApiNode = ({ id, data }) => {
  const [apiUrl, setApiUrl] = useState(data?.apiUrl || '');
  const [method, setMethod] = useState(data?.method || 'GET');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    setApiUrl(data?.apiUrl || '');
  }, [data?.apiUrl]);

  useEffect(() => {
    setMethod(data?.method || 'GET');
  }, [data?.method]);

  const handleUrlChange = (e) => {
    const newValue = e.target.value;
    setApiUrl(newValue);
    updateNodeField(id, 'apiUrl', newValue);
  };

  const handleMethodChange = (value) => {
    setMethod(value);
    updateNodeField(id, 'method', value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="API"
      icon="🌐"
      handles={[
        { id: 'input', type: 'target' },
        { id: 'output', type: 'source' }
      ]}
      fields={[
        {
          type: 'text',
          label: 'API URL',
          value: apiUrl,
          onChange: handleUrlChange,
          placeholder: 'https://api.example.com'
        },
        {
          type: 'select',
          label: 'Method',
          value: method,
          onChange: handleMethodChange,
          options: [
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
            { value: 'PUT', label: 'PUT' },
            { value: 'DELETE', label: 'DELETE' }
          ]
        }
      ]}
    />
  );
}
