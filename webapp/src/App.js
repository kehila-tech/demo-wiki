import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const async_impl = async () => {
      const tmp_response = await fetch('/api/hello');
      setResponse(await tmp_response.text())
    };
    async_impl();
  });

  return (
    <div className="App">
      <h1>ברוכים הבאים</h1>
      <p>{response}</p>
    </div>
  );
}

export default App;
