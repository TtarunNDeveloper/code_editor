// src/Editor.js
import React, { useState } from "react";
import JSEditor from "./editors/JSEditor";
import TSEditor from "./editors/TSEditor";
import JSXEditor from "./editors/JSXEditor";
import "./Editor.css"; // Ensure this CSS file is imported
import shareIcon from './assets/arrow.png'; // Replace with your icon path

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState({
    javascript: `// Simple JavaScript Program\nfunction add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3)); // Output: 5`,
    typescript: `// Simple TypeScript Program\nfunction add(a: number, b: number): number {\n  return a + b;\n}\nconsole.log(add(2, 3)); // Output: 5`,
    jsx: `// Simple JSX Program\nimport React from "react";\n\nfunction App() {\n  return (\n    <div>\n      <h1>Hello, JSX!</h1>\n      <button onClick={() => alert("Clicked!")}>Click Me</button>\n    </div>\n  );\n}\n\nexport default App;`,
  });

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleEditorChange = (newValue) => {
    setCode((prevCode) => ({
      ...prevCode,
      [language]: newValue,
    }));
  };

  const handleShareClick = () => {
    const fileExtension = language === "typescript" ? "ts" : language === "jsx" ? "jsx" : "js";
    const element = document.createElement("a");
    const file = new Blob([code[language]], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `one.${fileExtension}`;
    document.body.appendChild(element);
    element.click();
  };

  const renderEditor = () => {
    switch (language) {
      case "javascript":
        return <JSEditor value={code.javascript} onChange={handleEditorChange} />;
      case "typescript":
        return <TSEditor value={code.typescript} onChange={handleEditorChange} />;
      case "jsx":
        return <JSXEditor value={code.jsx} onChange={handleEditorChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl">Code Editor with Autocomplete</h1>
      </header>
      <div className="flex flex-1 justify-center items-center">
        <div className="monitor bg-gray-800 p-4 rounded-lg shadow-lg w-4/5 h-5/6 relative border border-gray-700">
          <div className="monitor-buttons absolute top-0 left-0 m-2 flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1 flex justify-center items-center">
              <label htmlFor="language" className="mr-2">Select Language:</label>
              <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                className="p-2 bg-gray-700 border border-gray-600 rounded"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="jsx">JSX</option>
              </select>
            </div>
            <button
              onClick={handleShareClick}
              className="flex items-center p-2 bg-blue-600 border border-blue-700 rounded"
            >
              <img src={shareIcon} alt="Share" className="w-5 h-5 mr-2" />
              Share
            </button>
          </div>
          <div className="flex-1 p-4 h-full border-t border-gray-600">
            {renderEditor()}
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Code Editor Project</p>
      </footer>
    </div>
  );
};

export default CodeEditor;
