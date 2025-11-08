import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import HomeScreen from './components/HomeScreen';
import WatchPage from './components/WatchPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/watch" element={<WatchPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;