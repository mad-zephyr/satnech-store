import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Footer from 'app/components/footer/footer'
import Header from 'app/components/header/header'
import AppLoader from 'app/hoc/appLoader'
import CartPage from 'app/pages/cartPage/cartPage'
import MainPage from 'app/pages/main'
import ProductPage from 'app/pages/productPage/productPage'
import AdminProducts from 'app/pages/adminProducts/adminProducts'

import { useSelector } from 'react-redux'
import { getLocation } from 'app/store/location'

import 'app/global/style.sass'

import UserPage from 'app/pages/userPage/userPage'
import ProtectedRoute from 'app/hoc/protectedRoute'
import ProtectedRouteAdmin from 'app/hoc/protectedAdminRoute'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getAuthErrors } from 'app/store/user'

function App() {
  const location = useSelector(getLocation())
  const errorAuth = useSelector(getAuthErrors())

  useEffect(() => {
    if (errorAuth) {
      toast(errorAuth, {
        className: 'Toastify__toast-theme--dark',
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
        }
      )
    }
  }, [errorAuth])

  return (
    <>
      <AppLoader>
        {location !== 'admin' && <Header />}
        <Switch>
          <ProtectedRoute
            path="/user/:location?/:position?"
            component={UserPage}
          />
          <ProtectedRouteAdmin
            path='/admin'
            component={AdminProducts}
          />
          <Route path='/product/:id?' component={ProductPage} />
          <Route path='/cart/:step?' component={CartPage} />
          <Route path='/' exact component={MainPage} />
          <Redirect to='/' />
        </Switch>
        <Footer/>
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
        />
      </AppLoader>
    </>
  )
}

export default App
