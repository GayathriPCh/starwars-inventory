import { useState } from 'react';

const OpenAIComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState('');

  const fetchGeneratedText = async () => {
    setError('');
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setGeneratedText(data.trim());
      setPrompt('');
    } catch (error) {
      setError(`Error fetching generated text: ${error.message}`);
    }
  };

  return (
    <div className="example">
      <h2>Completion Example</h2>
      <div className="prompt">
        <div>
          <label htmlFor="prompt">Prompt:</label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button onClick={fetchGeneratedText}>Generate Text</button>
      </div>
      <div className="response">
        <h3>Generated Text:</h3>
        {error ? <p>{error}</p> : <p>{generatedText}</p>}
      </div>
    </div>
  );
};

export default OpenAIComponent;
