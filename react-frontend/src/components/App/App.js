import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Auth from './Auth';

function App() {
  const [testMessage, setTestMessage] = useState("");



  return (
    <div className="App">
      <NavBar/>
      {/* <Auth/> */}
    </div>
  );
}

export default App;