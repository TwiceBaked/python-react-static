import React, { useState, useEffect } from 'react';

const App = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetch('https://python-nodejs-server.azurewebsites.net/')  // Replace with your backend URL when deployed
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();  // Use .text() since we're sending a simple string
      })
      .then((data) => {
        setMessage(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);  // Empty array means this effect runs only once when the component mounts

  // Display loading message, error, or the fetched message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Message pulled from Node.js Server deployed by Python:</h1>
      <p>{message}</p>
    </div>
  );
};

export default App;
