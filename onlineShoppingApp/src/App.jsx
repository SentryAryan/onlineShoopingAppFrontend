import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import './App.css'
import AllProducts from './components/AllProducts'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Navbar from './components/Navbar'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import Footer from './components/Footer'
import Profile from './pages/Profile'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* <Route path="/admin/*" element={<Admin />} /> */}
        <Route path="/*" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<AllProducts />} />
                <Route path="/login" element={
                  <div className="flex justify-center items-center min-h-screen">
                    <LoginForm />
                  </div>
                } />
                <Route path="/signup" element={
                  <div className="flex justify-center items-center min-h-screen">
                    <SignupForm />
                  </div>
                } />
                <Route path="/currentProduct" element={
                  <div className="flex justify-center items-center min-h-screen">
                    <ProductDetails />
                  </div>
                } />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  )
}

export default App
