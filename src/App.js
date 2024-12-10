import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import AddCertificate from "./components/CreateCertificate";
import ThemeProvider from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/add-certificate" element={<AddCertificate />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
