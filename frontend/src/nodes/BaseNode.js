// BaseNode.js - Abstraction for all node types

import { Handle, Position } from 'reactflow';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { cn } from '../lib/utils';

/**
 * BaseNode - A flexible abstraction for creating ReactFlow nodes
 *
 * @param {string} id - Node ID from ReactFlow
 * @param {object} data - Node data from ReactFlow
 * @param {string} title - Title displayed in the node header
 * @param {string} icon - Optional emoji/icon to display next to title
 * @param {Array} handles - Array of handle configurations
 *   Example: [{ id: 'input', type: 'target', style: { top: '50%' } }]
 * @param {Array} fields - Array of field configurations
 *   Example: [{ type: 'text', label: 'Name', value: name, onChange: handleChange }]
 * @param {ReactNode} children - Custom content to render in the card
 * @param {string} className - Additional CSS classes
 * @param {object} style - Inline styles
 */
export const BaseNode = ({
  id,
  data,
  title,
  icon,
  handles = [],
  fields = [],
  children,
  className,
  style = {}
}) => {
  return (
    <Card className={cn("w-[200px] min-h-[80px]", className)} style={style}>
      {/* Render input handles on the left */}
      {handles
        .filter(handle => handle.type === 'target')
        .map((handle) => (
          <Handle
            key={handle.id}
            type="target"
            position={Position.Left}
            id={`${id}-${handle.id}`}
            style={handle.style || {}}
            className="w-3 h-3 bg-slate-500 border-2 border-white"
          />
        ))}

      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon && <span className="text-base">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>

      {(fields.length > 0 || children) && (
        <CardContent className="p-3 pt-0 space-y-2">
          {/* Render dynamic fields */}
          {fields.map((field, index) => (
            <div key={index} className="space-y-1">
              {field.label && (
                <Label className="text-xs text-slate-600">
                  {field.label}
                </Label>
              )}

              {field.type === 'text' && (
                <Input
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  className="h-8 text-xs"
                  placeholder={field.placeholder}
                />
              )}

              {field.type === 'textarea' && (
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  className="text-xs resize-none"
                  rows={field.rows || 3}
                  placeholder={field.placeholder}
                />
              )}

              {field.type === 'select' && (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {field.type === 'number' && (
                <Input
                  type="number"
                  value={field.value}
                  onChange={field.onChange}
                  className="h-8 text-xs"
                  placeholder={field.placeholder}
                />
              )}

              {field.type === 'date' && (
                <Input
                  type="date"
                  value={field.value}
                  onChange={field.onChange}
                  className="h-8 text-xs"
                />
              )}

              {field.type === 'file' && (
                <Input
                  type="file"
                  onChange={field.onChange}
                  className="h-8 text-xs"
                />
              )}
            </div>
          ))}

          {/* Render custom children if provided */}
          {children}
        </CardContent>
      )}

      {/* Render output handles on the right */}
      {handles
        .filter(handle => handle.type === 'source')
        .map((handle) => (
          <Handle
            key={handle.id}
            type="source"
            position={Position.Right}
            id={`${id}-${handle.id}`}
            style={handle.style || {}}
            className="w-3 h-3 bg-slate-500 border-2 border-white"
          />
        ))}
    </Card>
  );
};
