import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useStore } from '../store/store'


export default function Login() {
  const [uName, setUname] = useState('')
  const [pass, setPass] = useState('')
  
  const login = useStore(state => state.login)
  const nav = useNavigate()

  const doLogin = async () => {
    
    
      await login({ username: uName, password: pass })
      nav('/')
    
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>היתחברות</h1>
      
      <input placeholder="שם מישתמש" onChange={e => setUname(e.target.value)} /><br/><br/>
      <input type="password" placeholder="סיסמה" onChange={e => setPass(e.target.value)} /><br/>
      
      <br/><button onClick={doLogin}>כניסה</button>
    </div>
  )
}
