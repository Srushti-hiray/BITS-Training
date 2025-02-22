import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ text: inputValue });
  };

  return (
    <div className="container">
      <h1>Search Params Demo</h1>
      
      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter some text..."
        />
        <button type="submit">Update URL</button>
      </form>

      <div className="result">
        <h2>Current Values:</h2>
        <p>Input Value: {inputValue}</p>
        <p>URL Parameter: {searchParams.get('text') || 'No text in URL yet'}</p>
      </div>
    </div>
  );
}

export default App;