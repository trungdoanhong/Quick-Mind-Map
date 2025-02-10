import React from 'react';
import styled from 'styled-components';
import { MindMapNode } from '../types';

interface TextOutlineProps {
  nodes: MindMapNode[];
}

const OutlineContainer = styled.div`
  width: 300px;
  height: 100%;
  background: white;
  padding: 1rem;
  overflow-y: auto;
  border-left: 1px solid #ddd;
  font-family: monospace;
  white-space: pre-wrap;
`;

const OutlineItem = styled.div<{ level: number }>`
  padding: 0.25rem 0;
  line-height: 1.4;
`;

const getIndentation = (level: number): string => {
  return '    '.repeat(level);
};

const getPrefix = (level: number, index: number[]): string => {
  if (level === 0) return '';
  return `${index.join('.')}. `;
};

const TextOutline: React.FC<TextOutlineProps> = ({ nodes }) => {
  const renderNode = (nodeId: string, level: number = 0, index: number[] = []): React.ReactNode => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return null;

    const indentation = getIndentation(level);
    const prefix = getPrefix(level, index);
    const content = node.content || '(empty)';

    return (
      <React.Fragment key={node.id}>
        <OutlineItem level={level}>
          {indentation}{prefix}{content}
        </OutlineItem>
        {node.children.map((childId, idx) => 
          renderNode(
            childId, 
            level + 1, 
            level === 0 ? [idx + 1] : [...index, idx + 1]
          )
        )}
      </React.Fragment>
    );
  };

  if (nodes.length === 0) return null;

  return (
    <OutlineContainer>
      {renderNode(nodes[0].id)}
    </OutlineContainer>
  );
};

export default TextOutline; 