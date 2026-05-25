import { Link, useNavigate} from 'react-router'
import {useState} from 'react'
import {useAuth} from '../hooks/useAuth'
import '../auth.form.scss'

const Register = () => {

  const navigate = useNavigate()


  const {loading, handleRegister} = useAuth()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async(e) =>{
    e.preventDefault()
    await handleRegister({email, username, password})
    navigate('/')
  }

  if(loading){
    return (<main><h1>Loading...</h1></main>)
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="Enter your email" onChange={(e) => {setEmail(e.target.value)}}/>
          </div>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required placeholder="Enter your username" onChange={(e) => {setUsername(e.target.value)}}/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required placeholder="Enter your password" onChange={(e) => {setPassword(e.target.value)}}/>
          </div>
          <button className="button primary-button">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register