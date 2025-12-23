
import './App.css'

import CodeEditor from '../components/codeEditor'

import ShowFiles from '../components/fileManager'

function App() {


  return (
    <>
      <div className="container">

        <div className="listOfFiles">
          <div className='explorer'><p>Explorer</p></div><hr />
          <div className="files">
            <ShowFiles></ShowFiles>
          </div>
        </div>


        <div className="right">
          <div className="language">
            python, js, c, c++, java
          </div>
          <CodeEditor />

        </div>


      </div>
    </>
  )
}

export default App
