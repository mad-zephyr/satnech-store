import React from 'react'
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

function App() {
  const location = useSelector(getLocation())

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
          <Route path='/:cart/:step?' component={CartPage} />
          <Route path='/' exact component={MainPage} />
          <Redirect to='/' />
        </Switch>
        <Footer/>
      </AppLoader>
    </>
  )
}

export default App
