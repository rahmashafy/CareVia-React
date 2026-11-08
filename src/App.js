import './App.css';
import "./components/firebase";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './components/Home';
import Registration from './components/Registration';
import About from './components/About';
import AdminLogin from './components/AdminLogin';
import Users from './components/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/registration" element={<Registration />} />

        <Route path="/about" element={<About />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        
        <Route path="/users" element={<Users />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;