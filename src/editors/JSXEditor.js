// src/editors/JSXEditor.js
import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/javascript";

const JSXEditor = ({ value, onChange }) => {
  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      onChange={onChange}
      name="JSXEditor"
      editorProps={{ $blockScrolling: true }}
      value={value}
      height="90%"
      width="100%"
      fontSize={18}
      style={{border:"2px solid white"}}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        useWorker: false, // Disable workers
      }}
    />
  );
};

export default JSXEditor;
