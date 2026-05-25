import {useContext} from 'react'; 
import {AuthContext} from '../context/auth.context.jsx';
import {register, login, logout} from '../services/auth.service.js';



export const useAuth = () =>{
  const context = useContext(AuthContext)
  const {user, setUser, loading, setLoading} = context 


  const handleRegister = async({email, username, password}) =>{
    setLoading(true)
    const data = await register({email, username, password})
    setUser(data.user)
    setLoading(false)
  }

  const handleLogin = async({email, password}) =>{
    setLoading(true)
    const data = await login({email, password})
    setUser(data.user)
    setLoading(false)
  }

  const handleLogout = async() =>{
    setLoading(true)
    await logout()
    setUser(null)
    setLoading(false)
  }

  return {user, loading, handleRegister, handleLogin, handleLogout}
}