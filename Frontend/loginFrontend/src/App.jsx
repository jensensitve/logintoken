import { useState } from 'react'
import './App.css'
import RegisterForm from "./components/RegisterForm.jsx"
import LoginForm from './components/LoginForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RegisterForm />
      <LoginForm />
    </>
  )
}

export default App
