import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MindMapNode } from '../types';

interface NodeProps {
  node: MindMapNode;
  isSelected: boolean;
  isEditing: boolean;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onContentChange: (id: string, content: string) => void;
  children?: React.ReactNode;
}

const NodeContainer = styled.div<{ isRoot?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.isRoot ? '2rem' : '1rem'};
`;

const NodeContent = styled.div<{ isSelected: boolean; isEditing: boolean }>`
  min-width: 120px;
  padding: 0.75rem 1rem;
  background-color: ${props => props.isSelected ? '#e3f2fd' : 'white'};
  border: 2px solid ${props => props.isSelected ? '#2196f3' : '#ddd'};
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    border-color: #2196f3;
  }
`;

const NodeInput = styled.textarea`
  width: 100%;
  min-height: 24px;
  border: none;
  background: transparent;
  resize: none;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  padding: 0;
  margin: 0;
`;

const ChildrenContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -1rem;
    left: 50%;
    width: 2px;
    height: 1rem;
    background-color: #ddd;
  }
`;

const Node: React.FC<NodeProps> = ({
  node,
  isSelected,
  isEditing,
  onSelect,
  onEdit,
  onContentChange,
  children
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.id);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(node.id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(node.id, e.target.value);
  };

  const finishEditing = () => {
    inputRef.current?.blur();
    onSelect(node.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow Shift+Enter for new line
        return;
      }
      // Just finish editing, don't create new node
      e.preventDefault();
      e.stopPropagation(); // Prevent the event from bubbling up to MindMap
      finishEditing();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      finishEditing();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      finishEditing();
    }
  };

  return (
    <NodeContainer isRoot={node.parent === null}>
      <NodeContent
        isSelected={isSelected}
        isEditing={isEditing}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {isEditing ? (
          <NodeInput
            ref={inputRef}
            value={node.content}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={finishEditing}
          />
        ) : (
          node.content
        )}
      </NodeContent>
      {children && <ChildrenContainer>{children}</ChildrenContainer>}
    </NodeContainer>
  );
};

export default Node; 