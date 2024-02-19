import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

function App() {
  const [testMessage, setTestMessage] = useState("");



  return (
    <div className="App">
      <NavBar/>
      
    </div>
  );
}

export default App;