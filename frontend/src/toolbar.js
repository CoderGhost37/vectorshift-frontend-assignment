// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
            <div className="flex items-center gap-3 flex-wrap">
                <DraggableNode type='customInput' label='Input' icon='📥' />
                <DraggableNode type='llm' label='LLM' icon='🤖' />
                <DraggableNode type='customOutput' label='Output' icon='📤' />
                <DraggableNode type='text' label='Text' icon='📝' />
                <DraggableNode type='api' label='API' icon='🌐' />
                <DraggableNode type='filter' label='Filter' icon='🔍' />
                <DraggableNode type='date' label='Date' icon='📅' />
                <DraggableNode type='conditional' label='Conditional' icon='🔀' />
                <DraggableNode type='transform' label='Transform' icon='⚙️' />
            </div>
        </div>
    );
};
