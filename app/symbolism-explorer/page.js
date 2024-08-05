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
    <div style={{ background: 'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bc8a3e51-68fd-4e99-89c6-1857948d8544/dhmogc0-0409eb8e-c4b0-47eb-bcc1-06c7ed33f268.png/v1/fit/w_828,h_464,q_70,strp/japanese_mythology_by_inkimagine_dhmogc0-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzE4IiwicGF0aCI6IlwvZlwvYmM4YTNlNTEtNjhmZC00ZTk5LTg5YzYtMTg1Nzk0OGQ4NTQ0XC9kaG1vZ2MwLTA0MDllYjhlLWM0YjAtNDdlYi1iY2MxLTA2YzdlZDMzZjI2OC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.p6uc7XLkpjyDtwwlEoDzborp1AlOcUJvazQekEDq3ck', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', fontFamily: 'Courier Ne")w, monospace' }}>
      <h1 style={{ color: '#FFF', marginBottom: '20px', fontWeight: 'bold' }}>Story generator</h1>
      <p style={{ color: '#FFF', marginBottom: '30px', textAlign: 'center' }}>So you have a bunch of imaginary characters, objects and what not, but cant come up with a cool story having all of those? Then try out this story generator! Add or remove items from the inventory, add characters, objects and what not. And come here and enter the number of words. Watch the magic happen!</p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button onClick={() => handleAiWith('text')} className={aiWith === 'text' ? 'aiWithActive' : ''} style={{ marginBottom: '20px', backgroundColor: '#FFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontFamily: 'AudioWide', fontWeight: 'bold' }}>Enter the number of words you want your story to be!</button>

      </div>

      <div style={{ width: '80%', maxWidth: '600px', margin: '30px auto', background: '#FFF', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
        {aiWith === 'text' ? <SymbolismText /> : null} 
      </div>

      <Link href="/" style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: '#FFF', padding: '10px 20px', border: '1px solid #000', borderRadius: '5px', textDecoration: 'none', color: '#000', fontFamily: 'Courier New, monospace', fontWeight: 'bold' }}>Back</Link>
    </div>
  );
};

export default SymbolismExplorerPage;
