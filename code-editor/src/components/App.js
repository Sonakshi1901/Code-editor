import React, { useState, useEffect } from "react";
import Editor from "./Editor.js"
import './App.css';
import useLocalStorage from './Hooks/useLocalStorage.js'


function App() {
  const [html, setHTML] = useLocalStorage('html','')
  const [css, setCSS] = useLocalStorage('css','')
  const [js, setJS] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        `
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
          </html>
        `
      )
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className="pane top-pane">
       <Editor
         language="xml"
         displayName="HTML"
         value={html}
         onChange={setHTML}
        />
       <Editor
         language="css"
         displayName="CSS"
         value={css}
         onChange={setCSS}
        />
       <Editor
         language="javascript"
         displayName="JS"
         value={js}
         onChange={setJS}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
          frameBorder="0"
        />
      </div>
    </>
  );
}

export default App;

{/* In sandbox it is necessary to write "allow-scripts" so that when you run this application,
  this will not allow you to access a bunch of cookies, documentation.
  To avoid anyone from stealing the data through servers */}
