import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Subscribe from './pages/Subscribe'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import BoxDetail from './pages/BoxDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Account from './pages/Account'
import Orders from './pages/Orders'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import NotFound from './pages/NotFound'
import Join from './pages/Join'
import Gift from './pages/Gift'

export default function App() {
  return (
    <Routes>
      {/* Standalone onboarding wizards (no main navbar) */}
      <Route path="/join" element={<Join />} />
      <Route path="/gift" element={<Gift />} />

      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="subscribe" element={<Subscribe />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:slug" element={<ProductDetail />} />
        <Route path="boxes/:slug" element={<BoxDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="account" element={<Account />} />
        <Route path="orders" element={<Orders />} />
        <Route path="admin/products" element={<AdminProducts />} />
        <Route path="admin/orders" element={<AdminOrders />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
