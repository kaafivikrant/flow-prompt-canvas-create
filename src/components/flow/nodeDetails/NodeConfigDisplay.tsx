
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface NodeConfigDisplayProps {
  config: Record<string, any>;
  handleEdit: () => void;
}

const NodeConfigDisplay: React.FC<NodeConfigDisplayProps> = ({ config, handleEdit }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-sm">Configuration</h4>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 p-2"
          onClick={handleEdit}
        >
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
      </div>
      <div className="bg-gray-50 p-2 rounded text-xs font-mono">
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </div>
    </>
  );
};

export default NodeConfigDisplay;
