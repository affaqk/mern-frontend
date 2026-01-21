import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import ProductsDetail from './pages/ProductsDetail'
import Login from './pages/Login'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/product-detail/:id" element = {<ProductsDetail/>}/>
      <Route path = "/login" element = {<Login/>}/>
    </Routes>
    </>
  )
}

export default App
