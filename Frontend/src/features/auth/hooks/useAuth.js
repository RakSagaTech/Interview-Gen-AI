import {useContext} from 'react'; 
import {AuthContext} from '../context/auth.context.jsx';
import {register, login, logout} from '../services/auth.api.js';



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

  return {user, loading, handleRegister, handleLogin, handleLogout}
}