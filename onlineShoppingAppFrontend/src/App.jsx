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
import Admin from './components/Admin'
import CartPage from './pages/CartPage'

// Layout component for pages with Navbar and Footer
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/*" element={<Admin />} />

        <Route path="/cart" element={<CartPage />} />

        {/* Auth routes without Navbar/Footer */}
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

        {/* Main routes with Navbar/Footer */}
        <Route path="/*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<AllProducts />} />
              <Route path="/currentProduct" element={
                <div className="flex justify-center items-center min-h-screen">
                  <ProductDetails />
                </div>
              } />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </div>
  )
}

export default App
