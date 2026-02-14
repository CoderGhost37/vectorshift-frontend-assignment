// conditionalNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    setCondition(data?.condition || 'equals');
  }, [data?.condition]);

  const handleConditionChange = (value) => {
    setCondition(value);
    updateNodeField(id, 'condition', value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional"
      icon="🔀"
      handles={[
        { id: 'input', type: 'target', style: { top: '25%' } },
        { id: 'condition', type: 'target', style: { top: '50%' } },
        { id: 'true', type: 'source', style: { top: '33%' } },
        { id: 'false', type: 'source', style: { top: '66%' } }
      ]}
      fields={[
        {
          type: 'select',
          label: 'Condition',
          value: condition,
          onChange: handleConditionChange,
          options: [
            { value: 'equals', label: 'Equals' },
            { value: 'greater', label: 'Greater Than' },
            { value: 'less', label: 'Less Than' },
            { value: 'contains', label: 'Contains' }
          ]
        }
      ]}
    />
  );
}
