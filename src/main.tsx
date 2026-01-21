import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EditorProvider } from "./context/EditorContext";
import './index.css'
import App from './App.tsx'
import './monaco/setup';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EditorProvider>
      <App />
    </EditorProvider>
  </StrictMode>,
)
