import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="app">
          <Dashboard />
        </div>
      </ThemeProvider>
    </Router>
  );
}
