// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      icon="🤖"
      handles={[
        { id: 'system', type: 'target', style: { top: `${100/3}%` } },
        { id: 'prompt', type: 'target', style: { top: `${200/3}%` } },
        { id: 'response', type: 'source' }
      ]}
      fields={[]}
    >
      <div className="text-xs text-slate-500">
        This is a LLM.
      </div>
    </BaseNode>
  );
}
