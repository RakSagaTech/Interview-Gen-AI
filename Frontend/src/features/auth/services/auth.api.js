import axios from 'axios'


const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

export async function register({email, username, password}){
  try{
    const response = await api.post('/api/auth/register', {email, username, password})
    return response.data 
  }catch(err){
    console.error('Registration failed:', err)
  }
}

export async function login({username, password}){
  try{
    const response = await api.post('/api/auth/login', {username, password})
    return response.data 
  }catch(err){
    console.error('Login failed:', err)
  }
}

export async function logout(){
  try{
    const response = await api.get('/api/auth/logout')
    return response.data 
  }catch(err){
    console.error('Logout failed:', err)
  }
}

export async function getMe(){
  try{
    const response = await api.get('/api/auth/get-me')
    return response.data 
  }catch(err){
    console.error('Failed to fetch user data:', err)
  }
}