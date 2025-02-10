import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { MindMapNode } from '../types';
import Node from './Node';

const MindMapContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  padding: 2rem;
`;

const Canvas = styled.div<{ scale: number; x: number; y: number }>`
  width: 100%;
  height: 100%;
  position: relative;
  transform: scale(${props => props.scale}) translate(${props => props.x}px, ${props => props.y}px);
  transform-origin: center;
  transition: transform 0.1s ease-out;
`;

const ZoomControls = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ZoomButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f5f5f5;
  }
`;

const initialNode: MindMapNode = {
  id: 'root',
  content: 'Ý chính',
  children: [],
  parent: null,
};

interface MindMapProps {
  nodes: MindMapNode[];
  onNodesChange: (nodes: MindMapNode[]) => void;
}

const MindMap: React.FC<MindMapProps> = ({ nodes, onNodesChange }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (nodes.length === 0) {
      onNodesChange([initialNode]);
    }
  }, [nodes, onNodesChange]);

  const handleNodeSelect = (id: string) => {
    setSelectedNode(id);
    setEditingNode(null);
  };

  const handleNodeEdit = (id: string) => {
    setEditingNode(id);
  };

  const handleContentChange = (id: string, content: string) => {
    onNodesChange(
      nodes.map(node => node.id === id ? { ...node, content } : node)
    );
  };

  const createNewNode = useCallback((parentId: string | null) => {
    const newNodeId = `node-${Date.now()}`;
    const newNode: MindMapNode = {
      id: newNodeId,
      content: '',
      children: [],
      parent: parentId,
    };

    if (parentId) {
      // Add as child
      onNodesChange([
        ...nodes.map(node =>
          node.id === parentId
            ? { ...node, children: [...node.children, newNodeId] }
            : node
        ),
        newNode
      ]);
    } else {
      // Add as sibling
      const selectedNodeData = nodes.find(n => n.id === selectedNode);
      const parentNodeId = selectedNodeData?.parent;
      if (parentNodeId !== null && parentNodeId !== undefined) {
        onNodesChange([
          ...nodes.map(node =>
            node.id === parentNodeId
              ? { ...node, children: [...node.children, newNodeId] }
              : node
          ),
          newNode
        ]);
      }
    }

    setSelectedNode(newNodeId);
    setEditingNode(newNodeId);
  }, [nodes, onNodesChange, selectedNode]);

  const deleteNode = useCallback((nodeId: string) => {
    // Don't allow deleting the root node
    if (nodeId === nodes[0].id) return;

    // Find the parent node
    const nodeToDelete = nodes.find(n => n.id === nodeId);
    if (!nodeToDelete) return;

    const parentNode = nodes.find(n => n.id === nodeToDelete.parent);
    if (!parentNode) return;

    // Get all descendant node IDs
    const getDescendantIds = (id: string): string[] => {
      const node = nodes.find(n => n.id === id);
      if (!node) return [];
      return [id, ...node.children.flatMap(getDescendantIds)];
    };

    const idsToDelete = getDescendantIds(nodeId);

    // Update parent's children and remove deleted nodes
    onNodesChange(
      nodes
        .filter(node => !idsToDelete.includes(node.id))
        .map(node =>
          node.id === parentNode.id
            ? { ...node, children: node.children.filter(id => id !== nodeId) }
            : node
        )
    );

    // If the deleted node was selected, select its parent
    if (selectedNode === nodeId) {
      setSelectedNode(parentNode.id);
    }
  }, [nodes, onNodesChange, selectedNode]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Only handle keyboard shortcuts when not editing
    if (!selectedNode || editingNode) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Create sibling node (same level) only when not editing
      const selectedNodeData = nodes.find(n => n.id === selectedNode);
      if (selectedNodeData && selectedNodeData.parent !== null) {
        createNewNode(selectedNodeData.parent);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Create child node
      createNewNode(selectedNode);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      // Delete selected node
      if (selectedNode !== nodes[0].id) { // Don't delete root node
        deleteNode(selectedNode);
      }
    }
  }, [selectedNode, editingNode, nodes, createNewNode, deleteNode]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(s => Math.min(Math.max(0.1, s * delta), 2));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setScale(s => Math.min(s * 1.2, 2));
  };

  const handleZoomOut = () => {
    setScale(s => Math.max(s * 0.8, 0.1));
  };

  const handleZoomReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleKeyDown, handleWheel]);

  const renderNode = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return null;

    return (
      <Node
        key={node.id}
        node={node}
        isSelected={selectedNode === node.id}
        isEditing={editingNode === node.id}
        onSelect={handleNodeSelect}
        onEdit={handleNodeEdit}
        onContentChange={handleContentChange}
      >
        {node.children.map(childId => renderNode(childId))}
      </Node>
    );
  };

  if (nodes.length === 0) return null;

  return (
    <MindMapContainer
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Canvas scale={scale} x={position.x} y={position.y}>
        {renderNode(nodes[0].id)}
      </Canvas>
      <ZoomControls>
        <ZoomButton onClick={handleZoomIn}>+</ZoomButton>
        <ZoomButton onClick={handleZoomReset}>⟲</ZoomButton>
        <ZoomButton onClick={handleZoomOut}>-</ZoomButton>
      </ZoomControls>
    </MindMapContainer>
  );
};

export default MindMap; 