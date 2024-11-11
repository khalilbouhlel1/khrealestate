import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/about'
import Profile from './pages/Profile'
import Header from './components/Header'
import Listings from './pages/Listings'
import Contact from './pages/Contact'
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserContext';
import PropertyDetails from './pages/PropertyDetails';
import EditProperty from './pages/EditProperty';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <UserProvider>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/edit-property/:id" element={<EditProperty />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
      </BrowserRouter>
    </UserProvider>
  )
}

export default App