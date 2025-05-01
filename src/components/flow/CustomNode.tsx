
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { ArrowRight, CheckCircle, DollarSign, Bell, AlertCircle, FileText, ShieldCheck } from 'lucide-react';
import { CustomNodeData, NodeDefinition } from './types/NodeDefinition';

const CustomNode = ({ data }: NodeProps) => {
  // Safely access data properties with proper type handling
  const label = data?.label as string;
  const nodeType = data?.type as string;
  const nodeDefinition = data?.nodeDefinition as NodeDefinition | undefined;
  
  // Select icon based on node type
  const getNodeIcon = () => {
    switch (nodeType) {
      case 'start':
        return <ArrowRight size={20} />;
      case 'verification':
        return <CheckCircle size={20} />;
      case 'payment':
        return <DollarSign size={20} />;
      case 'notification':
        return <Bell size={20} />;
      case 'compliance':
        return <ShieldCheck size={20} />;
      case 'end':
        return <AlertCircle size={20} />;
      default:
        return <FileText size={20} />;
    }
  };
  
  // Get background color based on node type
  const getNodeBackground = () => {
    switch (nodeType) {
      case 'start':
        return 'bg-emerald-50';
      case 'verification':
        return 'bg-blue-50';
      case 'payment':
        return 'bg-amber-50';
      case 'notification':
        return 'bg-purple-50';
      case 'compliance':
        return 'bg-red-50';
      case 'end':
        return 'bg-gray-50';
      default:
        return 'bg-slate-50';
    }
  };
  
  // Get text color based on node type
  const getNodeTextColor = () => {
    switch (nodeType) {
      case 'start':
        return 'text-emerald-700';
      case 'verification':
        return 'text-blue-700';
      case 'payment':
        return 'text-amber-700';
      case 'notification':
        return 'text-purple-700';
      case 'compliance':
        return 'text-red-700';
      case 'end':
        return 'text-gray-700';
      default:
        return 'text-slate-700';
    }
  };
  
  return (
    <div className={`p-3 rounded-md border bg-white shadow-md min-w-[200px]`}>
      <div className="flex items-start gap-3">
        <div className={`${getNodeBackground()} p-2 rounded ${getNodeTextColor()}`}>
          {getNodeIcon()}
        </div>
        <div className="flex-1">
          <div className="font-medium text-flow-text">{label}</div>
          <div className="text-xs text-gray-500 mt-1">
            {nodeDefinition?.description || 'Click to configure'}
          </div>
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
};

export default memo(CustomNode);
