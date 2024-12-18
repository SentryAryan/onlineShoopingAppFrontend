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
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProducts } from './store/slices/products'
import { setCart } from './store/slices/cartSlice'
import { setQuantity } from './store/slices/quantitySlice'
import { setLoading } from './store/slices/loadingSlice'
import toast from 'react-hot-toast'
import UserUpdatePage from './pages/UserUpdatePage'

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
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.auth.loggedInUser)
  const isLogin = useSelector(state => state.isLogin)
  const products = useSelector(state => state.products.products)
  const cart = useSelector(state => state.cart.cart)
  const quantity = useSelector(state => state.quantity.quantity)

  const fetchData = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
      dispatch(setProducts(response.data))

      if (loggedInUser) {
        // Fetch cart data
        dispatch(setLoading(true))
        const cartResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/cart/${loggedInUser.id}`);
        const cart = cartResponse.data;
        dispatch(setCart(cart));

        // Set quantities from cart data
        cart.forEach(item => {
          dispatch(setQuantity({
            productId: item.product.id,
            quantity: item.quantity
          }));
        });
      }
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
      toast.error('Failed to load products')
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [isLogin, loggedInUser])

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/*" element={<Admin />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/userUpdatePage" element={<UserUpdatePage />} />

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
