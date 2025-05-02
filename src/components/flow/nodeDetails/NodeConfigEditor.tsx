
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NodeDefinition } from '../types/NodeDefinition';

interface NodeConfigEditorProps {
  nodeDefinition: NodeDefinition;
  editedConfig: {
    endpoint?: string;
    method?: string;
  };
  setEditedConfig: React.Dispatch<React.SetStateAction<{
    endpoint?: string;
    method?: string;
  }>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleSaveConfig: () => void;
}

const NodeConfigEditor: React.FC<NodeConfigEditorProps> = ({ 
  nodeDefinition, 
  editedConfig, 
  setEditedConfig, 
  setIsEditing,
  handleSaveConfig
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Endpoint:</label>
        <Input 
          value={editedConfig.endpoint || ''} 
          onChange={(e) => setEditedConfig({...editedConfig, endpoint: e.target.value})}
          className="text-xs h-8"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Method:</label>
        <select 
          value={editedConfig.method || ''}
          onChange={(e) => setEditedConfig({...editedConfig, method: e.target.value})}
          className="w-full p-2 text-xs border border-gray-200 rounded h-8"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </Button>
        <Button 
          size="sm" 
          onClick={handleSaveConfig}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default NodeConfigEditor;
