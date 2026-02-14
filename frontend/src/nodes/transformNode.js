// transformNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TransformNode = ({ id, data }) => {
  const [transform, setTransform] = useState(data?.transform || 'uppercase');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    setTransform(data?.transform || 'uppercase');
  }, [data?.transform]);

  const handleTransformChange = (value) => {
    setTransform(value);
    updateNodeField(id, 'transform', value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      icon="⚡"
      handles={[
        { id: 'input', type: 'target' },
        { id: 'output', type: 'source' }
      ]}
      fields={[
        {
          type: 'select',
          label: 'Transform',
          value: transform,
          onChange: handleTransformChange,
          options: [
            { value: 'uppercase', label: 'Uppercase' },
            { value: 'lowercase', label: 'Lowercase' },
            { value: 'capitalize', label: 'Capitalize' },
            { value: 'reverse', label: 'Reverse' },
            { value: 'trim', label: 'Trim' }
          ]
        }
      ]}
    />
  );
}
