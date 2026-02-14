// filterNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const [filterType, setFilterType] = useState(data?.filterType || 'includes');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    setFilterType(data?.filterType || 'includes');
  }, [data?.filterType]);

  useEffect(() => {
    setFilterValue(data?.filterValue || '');
  }, [data?.filterValue]);

  const handleTypeChange = (value) => {
    setFilterType(value);
    updateNodeField(id, 'filterType', value);
  };

  const handleValueChange = (e) => {
    const newValue = e.target.value;
    setFilterValue(newValue);
    updateNodeField(id, 'filterValue', newValue);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      icon="🔍"
      handles={[
        { id: 'input', type: 'target' },
        { id: 'match', type: 'source', style: { top: '40%' } },
        { id: 'nomatch', type: 'source', style: { top: '70%' } }
      ]}
      fields={[
        {
          type: 'select',
          label: 'Filter Type',
          value: filterType,
          onChange: handleTypeChange,
          options: [
            { value: 'includes', label: 'Includes' },
            { value: 'excludes', label: 'Excludes' },
            { value: 'startsWith', label: 'Starts With' },
            { value: 'endsWith', label: 'Ends With' },
            { value: 'regex', label: 'Regex' }
          ]
        },
        {
          type: 'text',
          label: 'Filter Value',
          value: filterValue,
          onChange: handleValueChange,
          placeholder: 'Enter filter value...'
        }
      ]}
    />
  );
}
