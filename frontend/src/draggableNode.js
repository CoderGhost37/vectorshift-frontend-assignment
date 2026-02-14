// draggableNode.js

import { Button } from './components/ui/button';

export const DraggableNode = ({ type, label, icon }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    return (
      <Button
        variant="outline"
        className="cursor-grab active:cursor-grabbing h-9 px-3 flex items-center justify-center gap-2 hover:bg-slate-50"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
        {icon && <span className="text-base">{icon}</span>}
        <span className="text-sm font-medium">{label}</span>
      </Button>
    );
  };
  