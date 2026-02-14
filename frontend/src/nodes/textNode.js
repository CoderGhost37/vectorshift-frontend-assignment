// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200, minHeight: 120 });
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    setCurrText(data?.text || '{{input}}');
  }, [data?.text]);

  const handleTextChange = (e) => {
    const newValue = e.target.value;
    setCurrText(newValue);
    updateNodeField(id, 'text', newValue);
  };

  // Extract variables from text (e.g., {{variableName}})
  useEffect(() => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const varNames = matches.map(match => match[1]);
    const uniqueVars = [...new Set(varNames)]; // Remove duplicates
    setVariables(uniqueVars);
  }, [currText]);

  // Calculate dynamic dimensions based on content
  useEffect(() => {
    if (textareaRef.current) {
      // Calculate width based on longest line
      const lines = currText.split('\n');
      const longestLine = lines.reduce((max, line) =>
        line.length > max.length ? line : max, '');

      // Approximate width: ~8px per character + padding
      const calculatedWidth = Math.max(200, Math.min(400, longestLine.length * 8 + 60));

      // Calculate height based on number of lines
      const lineCount = Math.max(lines.length, 3);
      const calculatedHeight = Math.max(120, lineCount * 24 + 80);

      setDimensions({
        width: calculatedWidth,
        minHeight: calculatedHeight
      });
    }
  }, [currText]);

  return (
    <Card
      className="bg-white"
      style={{ width: `${dimensions.width}px`, minHeight: `${dimensions.minHeight}px` }}
    >
      {/* Render dynamic input handles for variables */}
      {variables.map((varName, index) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            top: `${((index + 1) / (variables.length + 1)) * 100}%`,
          }}
          className="w-3 h-3 bg-blue-500 border-2 border-white"
        />
      ))}

      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <span className="text-base">📝</span>
          Text
        </CardTitle>
      </CardHeader>

      <CardContent className="p-3 pt-0 space-y-2">
        <div className="space-y-1">
          <Label className="text-xs text-slate-600">
            Text
          </Label>
          <Textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            className="text-xs resize-none"
            placeholder="Enter text with {{variables}}..."
            rows={Math.max(3, currText.split('\n').length)}
          />
          {variables.length > 0 && (
            <div className="text-xs text-slate-500 mt-1">
              Variables: {variables.join(', ')}
            </div>
          )}
        </div>
      </CardContent>

      {/* Output handle on the right */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="w-3 h-3 bg-slate-500 border-2 border-white"
      />
    </Card>
  );
}
