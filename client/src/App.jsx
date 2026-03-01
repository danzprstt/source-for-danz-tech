import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Materials from './pages/Materials';
import MaterialDetail from './pages/MaterialDetail';
import SearchResults from './pages/SearchResults';
import PrivateRoute from './components/PrivateRoute';
import './styles/global.css';

function App() {
  return (
    <div className="app">
      <div className="bg-gradient"></div>
      <div className="grid-overlay"></div>
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/materials/:id" element={<MaterialDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
