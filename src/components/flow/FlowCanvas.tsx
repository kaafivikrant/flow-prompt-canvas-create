
import React, { useState } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  BackgroundVariant,
  NodeTypes,
  Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useFlow } from './FlowProvider';
import CustomNode from './CustomNode';
import NodeDetails from './NodeDetails';
import { NodeDefinition } from './types/NodeDefinition';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Plus, List } from 'lucide-react';
import NodeLibrary from './NodeLibrary';
import NodeOrderManager from './NodeOrderManager';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';

// Define node types with correct typing
const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const FlowCanvas = () => {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    clearCanvas
  } = useFlow();

  const [selectedNodeDefinition, setSelectedNodeDefinition] = useState<NodeDefinition | undefined>(undefined);
  const [isMapping, setIsMapping] = useState<boolean>(false);

  // Handle node click to show node details - now with proper type safety
  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    // Safely access and cast the node definition to the expected type
    const nodeData = node.data;
    const definition = nodeData && 'nodeDefinition' in nodeData 
      ? nodeData.nodeDefinition as NodeDefinition 
      : undefined;
    
    setSelectedNodeDefinition(definition);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-160px)]">
      <div className="flex-1 border border-gray-200 rounded-md overflow-hidden relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
        >
          <Background color="#cbd5e1" variant={BackgroundVariant.Dots} gap={24} size={1} />
          <Controls />
          <MiniMap
            nodeStrokeWidth={3}
            zoomable
            pannable
            maskColor="rgb(245, 243, 255, 0.6)"
          />
        </ReactFlow>
        
        <div className="absolute bottom-4 left-4 z-10 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={clearCanvas}
            className="text-xs shadow-md bg-white hover:bg-gray-100"
          >
            Clear Canvas
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="sm"
                className="text-xs shadow-md bg-flow-primary text-white hover:bg-flow-primary/90"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Node
              </Button>
            </SheetTrigger>
            <SheetContent>
              <NodeLibrary />
            </SheetContent>
          </Sheet>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xs h-9 shadow-md bg-white hover:bg-gray-100">
                  <List className="h-4 w-4 mr-1" /> Manage Nodes
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 w-80">
                  <NodeOrderManager />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="w-full md:w-96">
        <NodeDetails 
          nodeDefinition={selectedNodeDefinition} 
          onEditMapping={setIsMapping} 
        />
      </div>
    </div>
  );
};

export default FlowCanvas;
