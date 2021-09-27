import React, {useCallback, useContext, useEffect, useState} from "react"
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {Preloader} from "../components/Preloader";

export const PersonalPage = () => {
  const [user, setUser] = useState(null)
  const history = useHistory()
  const { loading, request } = useHttp()
  const auth = useContext(AuthContext)

  const fetchUser = useCallback(async () => {
    try {
      if (auth.userId) {
        const fetched = await request('/api/user', 'POST', {userId: auth.userId}, {
          Authorization: `Bearer ${auth.token}`
        })
        setUser(fetched)
      }
    } catch (e) {
      
    }
  }, [auth])

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/login')
  }

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (loading) {
    return <Preloader/>
  }

    return (
        <div>
            <h1>{`Welcome ${user?.fullName}`}</h1>
            <h3 onClick={logoutHandler}>
              <a className={'waves-effect waves-light btn'}>{`To logout click here ${user?.fullName}`}</a>
            </h3>
        </div>
    )
}