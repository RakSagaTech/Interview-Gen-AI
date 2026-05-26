import {useContext, useEffect} from 'react'; 
import {AuthContext} from '../context/auth.context.jsx';
import {register, login, logout, getMe} from '../services/auth.api.js';



export const useAuth = () => {
  const context = useContext(AuthContext)
  const {user, setUser, loading, setLoading} = context 


  const handleRegister = async({email, username, password}) =>{
    setLoading(true)
    try{
      const data = await register({email, username, password})
    setUser(data.user)
    }catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  const handleLogin = async({username, password}) =>{
    setLoading(true)
    try{
      const data = await login({username, password})
      setUser(data.user)
    }catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  const handleLogout = async() =>{
    setLoading(true)
    try{
      await logout()
      setUser(null)
    }catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
    
  }

useEffect(() => {
  const getAndSetUser = async () => {
    try {
      const data = await getMe()
      if (!data || !data.user) {
        setUser(null)
        return
      }
      setUser(data.user)
    } catch (err) {
      console.log(err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  getAndSetUser()
}, [setUser, setLoading])

  return {user, loading, handleRegister, handleLogin, handleLogout}
}