"use client"; // Add this directive to mark the file as a client component

import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchItems } from '../firebase'; // Adjust the path as necessary

const SymbolismText = () => {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY); // Ensure API key is loaded from environment variable

  const [items, setItems] = useState([]);
  const [numWords, setNumWords] = useState(100); // Default to 100 words
  const [aiResponse, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadItems() {
      const fetchedItems = await fetchItems();
      setItems(fetchedItems);
    }
    loadItems();
  }, []);

  async function generateStory() {
    setLoading(true);
    setResponse('');
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const itemNames = items.map(item => item.name).join(', ');
    const prompt = `Generate a story with the following items: ${itemNames}. The story should be ${numWords} words long.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    setResponse(text);
    setLoading(false);
  }

  const handleNumWordsChange = (e) => {
    setNumWords(e.target.value);
  };

  const handleClick = () => {
    generateStory();
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="number"
          placeholder="Number of words"
          value={numWords}
          onChange={handleNumWordsChange}
          style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#FFF' }}
          onClick={handleClick}
        >
          Generate Story
        </button>
      </div>

      {loading && !aiResponse ? (
        <p style={{ margin: '30px 0' }}>Loading ...</p>
      ) : (
        <div style={{ margin: '30px 0' }}>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default SymbolismText;
