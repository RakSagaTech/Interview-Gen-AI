import { Link } from 'react-router'
import {useState} from 'react'
import {useAuth} from '../hooks/useAuth'
import '../auth.form.scss'

const Login = () => {

  const {loading, handleLogin} = useAuth() 

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) =>{
    e.preventDefault()
    await handleLogin({username, password})
  }

  if(loading){
    return (<main><h1>Loading...</h1></main>)
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required placeholder="Enter your username" onChange={(e) => {setUsername(e.target.value)}}/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
          <button className="button primary-button">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login