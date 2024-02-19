import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Main from './Main'
import { Route, Routes } from "react-router-dom";

function App() {
  const [testMessage, setTestMessage] = useState("");



  return (
    <>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>Vine Voice</title>
        <link rel="canonical" href="http://www.vinevoice.org" />
      </Helmet> */}
      <NavBar />

      <Routes>
    
        <Route path="/main" element={<Main />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/users/new" element={<CreateAccount />} /> */}
 
 
      </Routes>
    </>
  );
}

export default App;