import React, { useState } from 'react';
import styled from 'styled-components';
import MindMap from './components/MindMap';
import TextOutline from './components/TextOutline';
import { MindMapNode } from './types';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const MindMapContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

function App() {
  const [mindMapData, setMindMapData] = useState<MindMapNode[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const data = JSON.stringify(mindMapData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mindmap.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoad = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as MindMapNode[];
        setMindMapData(data);
      } catch (error) {
        alert('Error loading file: Invalid format');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  return (
    <AppContainer>
      <Header>
        <Title>Quick Mindmap</Title>
        <Actions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleLoad}>Load</Button>
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
          />
        </Actions>
      </Header>
      <MainContent>
        <MindMapContainer>
          <MindMap nodes={mindMapData} onNodesChange={setMindMapData} />
        </MindMapContainer>
        <TextOutline nodes={mindMapData} />
      </MainContent>
    </AppContainer>
  );
}

export default App; 