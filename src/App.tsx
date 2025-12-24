
import './App.css'
import files from './data/files'


import CodeEditor from '../components/codeEditor'

import ShowFiles from '../components/fileManager'
import { useState } from 'react'

import TabsAbove from '../components/tabs'

function App() {

  const [currentFile, setCurrentFile] = useState(
    Object.values(files)[0]
  )


  return (
    <>
      <div className="container">

        <div className="listOfFiles">
          <div className='explorer'><p>Explorer</p></div><hr />
          <div className="files">
            <ShowFiles
              files={files}
              onFileSelect={setCurrentFile}
            />
          </div>
        </div>


        <div className="right">
          <div className="language">
            <TabsAbove
              files={files}
              onFileSelect={setCurrentFile}
            />
          </div>
          <CodeEditor
            code={currentFile.value}
          />

        </div>


      </div>
    </>
  )
}

export default App
