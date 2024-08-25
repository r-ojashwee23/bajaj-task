"use client"
import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let parsedData;
    try {
        parsedData = JSON.parse(inputData);
    } catch (jsonError) {
        alert('Invalid JSON format');
        return;
    }

    try {
        const response = await axios.post('https://bajaj-task-blue.vercel.app/bfhl', {
            data: parsedData
        });
        console.log(response);
        setResponseData(response.data);
    } catch (error) {
        console.error('Error response:', error.response);
        alert(`Invalid JSON input or server error: ${error.message}`);
    }
  };

  const handleSelectChange = (e) => {
      const value = e.target.value;
      setSelectedOptions(prev => 
          prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
  };

  const renderResponse = () => {
    if (!responseData) return <h1>No response yet</h1>;

    return (
        <div className="mt-3">
            {selectedOptions.includes('Numbers') && responseData.numbers && responseData.numbers.length > 0 && (
                <div>
                    <h3>Numbers:</h3>
                    <p>{responseData.numbers.join(', ')}</p>
                </div>
            )}
            {selectedOptions.includes('Alphabets') && responseData.alphabets && responseData.alphabets.length > 0 && (
                <div>
                    <h3>Alphabets:</h3>
                    <p>{responseData.alphabets.join(', ')}</p>
                </div>
            )}
            {selectedOptions.includes('Highest lowercase alphabet') && responseData.highest_lowercase_alphabet && responseData.highest_lowercase_alphabet.length > 0 && (
                <div>
                    <h3>Highest Lowercase Alphabet:</h3>
                    <p>{responseData.highest_lowercase_alphabet.join(', ')}</p>
                </div>
            )}
        </div>
    );
  };

  return (
    <main >
      <div className="container">
        <h2 className="mt-4">Ojashwee Raman 21BAI1030</h2>
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="form-group">
                <textarea
                    className="form-control"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder='{"data": ["A", "C", "z"]}'
                    rows="4"
                />
            </div>
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </form>
        <div>
            <h2>Select Options:</h2>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" value="Alphabets" onChange={handleSelectChange} />
                <label className="form-check-label">Alphabets</label>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" value="Numbers" onChange={handleSelectChange} />
                <label className="form-check-label">Numbers</label>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" value="Highest lowercase alphabet" onChange={handleSelectChange} />
                <label className="form-check-label">Highest lowercase alphabet</label>
            </div>
        </div>
        {renderResponse()}
      </div>
    </main>
  );
}