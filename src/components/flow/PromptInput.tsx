
import React, { useState } from 'react';
import { useFlow } from './FlowProvider';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const PromptInput = () => {
  const { processPrompt, processingStatus } = useFlow();
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    processPrompt(prompt);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-2">
        <div className="flex gap-2">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your workflow (e.g., 'Create Form -> Process Data -> Send Email')"
            className="flex-1 min-h-[60px] resize-none border-gray-200 bg-white/70 backdrop-blur-sm"
          />
          
          <Button 
            type="submit" 
            disabled={!prompt.trim() || processingStatus === 'processing'}
            className="bg-flow-primary hover:bg-flow-primary/90 text-white ml-2 self-end"
          >
            {processingStatus === 'processing' ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Generate Flow'}
          </Button>
        </div>
        
        <div className="text-xs text-gray-500">
          {processingStatus === 'error' ? (
            <span className="text-red-500">Error processing your prompt. Please try again.</span>
          ) : processingStatus === 'success' ? (
            <span className="text-green-600">Flow nodes generated successfully!</span>
          ) : (
            <span>
              Type a description or use one of these formats:
              <br />
              - 'node1 {'->'} node2 {'->'} node3': Create connected nodes
              <br />
              - 'add {'->'} node_name': Add a specific node
              <br />
              - 'remove {'->'} node_name': Remove a specific node
            </span>
          )}
        </div>
      </div>
    </form>
  );
};
