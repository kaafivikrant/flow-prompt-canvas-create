
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { ArrowRight, SquareDashed } from 'lucide-react';

interface CustomNodeData {
  label: string;
  type: string;
}

const CustomNode = memo(({ data, selected }: NodeProps<CustomNodeData>) => {
  return (
    <div className={`p-3 ${selected ? 'border-flow-primary' : 'border-gray-200'}`}>
      <div className="flex items-start gap-3">
        <div className="bg-flow-background p-2 rounded text-flow-primary">
          {data.type === 'api' ? <ArrowRight size={20} /> : <SquareDashed size={20} />}
        </div>
        <div className="flex-1">
          <div className="font-medium text-flow-text">{data.label}</div>
          <div className="text-xs text-gray-500 mt-1">Click to configure</div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-flow-primary border-2 border-white"
        id="target"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-flow-primary border-2 border-white"
        id="source"
      />
    </div>
  );
});

export default CustomNode;
