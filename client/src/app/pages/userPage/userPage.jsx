import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLocation } from 'app/store/location'

import User from 'app/components/user/user'
import UserEdit from 'app/components/user/editUser/editUser'

const UserPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLocation('user'))
  }, [])

  return (
    <>
      <User>
        <UserEdit/>
      </User>
    </>
  )
}

export default UserPage
