import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [testMessage, setTestMessage] = useState("");

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get("/test");
        setTestMessage(response.data.message);

      } catch {
        console.error("Failed to fetch test messsage.")
      };
    };
    fetchTest();
  }, []);

  return (
    <div className="App">
      <h1>{testMessage || "Hello world!"}</h1>
    </div>
  );
}

export default App;