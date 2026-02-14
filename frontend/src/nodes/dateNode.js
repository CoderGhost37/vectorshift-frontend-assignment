// dateNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const DateNode = ({ id, data }) => {
  const [selectedDate, setSelectedDate] = useState(data?.selectedDate || '');
  const [dateFormat, setDateFormat] = useState(data?.dateFormat || 'ISO');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    setSelectedDate(data?.selectedDate || '');
  }, [data?.selectedDate]);

  useEffect(() => {
    setDateFormat(data?.dateFormat || 'ISO');
  }, [data?.dateFormat]);

  const handleDateChange = (e) => {
    const newValue = e.target.value;
    setSelectedDate(newValue);
    updateNodeField(id, 'selectedDate', newValue);
  };

  const handleFormatChange = (value) => {
    setDateFormat(value);
    updateNodeField(id, 'dateFormat', value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Date"
      icon="📅"
      handles={[
        { id: 'date', type: 'source' }
      ]}
      fields={[
        {
          type: 'date',
          label: 'Select Date',
          value: selectedDate,
          onChange: handleDateChange
        },
        {
          type: 'select',
          label: 'Format',
          value: dateFormat,
          onChange: handleFormatChange,
          options: [
            { value: 'ISO', label: 'ISO 8601' },
            { value: 'US', label: 'MM/DD/YYYY' },
            { value: 'EU', label: 'DD/MM/YYYY' }
          ]
        }
      ]}
    />
  );
}
