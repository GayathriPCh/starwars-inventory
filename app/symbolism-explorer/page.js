"use client"; // Add this directive to mark the file as a client component

import React, { useState } from 'react';
import Link from 'next/link'; // Use Next.js Link component
import SymbolismText from '../symbolism-explorer/symbolismtext'; // Adjust path as necessary

const SymbolismExplorerPage = () => {
  const [aiWith, setAiWith] = useState('text');

  const handleAiWith = (value) => {
    setAiWith(value);
  };

  return (
    <div style={{ background: 'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f393a0ef-7fde-479b-9aad-b0ea3035b643/dhg1f1f-5c82b3cc-e8d8-4654-a259-e52b175042ac.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2YzOTNhMGVmLTdmZGUtNDc5Yi05YWFkLWIwZWEzMDM1YjY0M1wvZGhnMWYxZi01YzgyYjNjYy1lOGQ4LTQ2NTQtYTI1OS1lNTJiMTc1MDQyYWMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.s_z-jEBeSXUiDJqrQvdc9LJP0VZBuC_Ek_nk7aoyzb4', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', fontFamily: 'Courier Ne")w, monospace' }}>
      <h1 style={{ color: '#FFF', marginBottom: '20px', fontWeight: 'bold' }}>Story generator</h1>
      <p style={{ color: '#FFF', marginBottom: '30px', textAlign: 'center' }}>So you have a bunch of imaginary characters, objects and what not, but cant come up with a cool story having all of those? Then try out this story generator! Add or remove items from the inventory, add characters, objects and what not. And come here and enter the number of words. Watch the magic happen!</p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button onClick={() => handleAiWith('text')} className={aiWith === 'text' ? 'aiWithActive' : ''} style={{ marginBottom: '20px', backgroundColor: '#FFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontFamily: 'AudioWide', fontWeight: 'bold' }}>Enter the number of words you want your story to be!</button>

      </div>

      <div style={{ width: '80%', maxWidth: '600px', margin: '30px auto', background: '#FFF', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
        {aiWith === 'text' ? <SymbolismText /> : <SymbolismImg />} {/* Ensure SymbolismImg is correctly defined */}
      </div>

      <Link href="/" style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: '#FFF', padding: '10px 20px', border: '1px solid #000', borderRadius: '5px', textDecoration: 'none', color: '#000', fontFamily: 'Courier New, monospace', fontWeight: 'bold' }}>Back</Link>
    </div>
  );
};

export default SymbolismExplorerPage;
