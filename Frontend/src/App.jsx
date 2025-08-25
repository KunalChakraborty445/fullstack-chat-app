import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { useAuthStore } from './store/userAuthStore.js'
import './index.css'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'


import { useSettingsStore } from "./store/useSettingsStore";



const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
   const { theme } = useSettingsStore();

  console.log({onlineUsers});
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (isCheckingAuth) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div data-theme={theme} className='min-h-screen flex flex-col'>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
