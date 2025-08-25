import React, { useState } from 'react'
import { useAuthStore } from '../store/userAuthStore';
import { Mail, MessageSquare, Lock, EyeOff, Eye, Loader2} from 'lucide-react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm =() =>{
        if(!formData.fullName.trim()) return toast.error("Full Name is required");
        if(!formData.email.trim()) return toast.error("Email is required");
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Email is invalid");
        if(!formData.password) return toast.error("Password is required");
        if(formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    };
    const  handleSubmit =(e) =>{
        e.preventDefault();

        const success = validateForm();

        if(success === true) signup(formData)
    };



  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
     {/* /left side of the form     */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>

        <div className="w-full max-w-md space-y-8">
            {/* logo  */}
           <div className="text-center mb-8">

                 <div className='flex flex-col items-center gap-2 group'>
                <div 
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                >
                    <MessageSquare className='size-6 text-primary' />
                </div>
                <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                <p className='text-base-content/60'>Get staeted with your free account</p>
                </div>
             </div>
            {/* form  */}
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className="form-control">
                    <label className='label'>
                        <span className='label-text fort-medium mb-1.5'>Full Name</span>
                    </label>
                    <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 ">
                                <User className="size-6 text-base-content/40" />
                            </div>
                            <input 
                            type="text"
                            className={`input input-bordered w-full pl-10 relative z-0"`}
                            placeholder='Jone Doe'
                            value={formData.fullName} 
                            onChange={(e)=> setFormData({ ...formData, fullName: e.target.value})}
                            />
                    </div>
                </div>

                {/* email  */}
                <div className="form-control">
                    <label className='label'>
                        <span className='label-text fort-medium mb-1.5'>Email</span>
                    </label>
                    <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                <Mail className='size-5 text-base-content/40' />
                            </div>
                            <input 
                            type="text"
                            className={`input input-bordered w-full pl-10`}
                            placeholder='user123@gmail.com'
                            value={formData.email} 
                            onChange={(e)=> setFormData({ ...formData, email: e.target.value})}
                            />
                    </div>
                </div>

                {/* lock/password  */}

                <div className="form-control">
                    <label className='label'>
                        <span className='label-text fort-medium mb-1.5'>Password</span>
                    </label>
                    <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                <Lock className='size-5 text-base-content/40' />
                            </div>
                            <input 
                            type={showPassword ? "text" : "password"}
                            className={`input input-bordered w-full pl-10`}
                            placeholder='••••••••'
                            value={formData.password} 
                            onChange={(e)=> setFormData({ ...formData, password: e.target.value})}
                            />
                            <button
                            type='button'
                            className='absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40'
                            onClick={() => setShowPassword(!showPassword)}
                            >
                                {
                                    showPassword ?(
                                        <EyeOff className='size-5 text-base-content/40' />
                                    ):(
                                        <Eye className='size-5 text-base-content/40' />
                                    )
                                }
                            </button>
                    </div>
                </div>
                                <button type='submit' className='btn btn-primary w-full mt-4' disabled={isSigningUp}>
                                    {isSigningUp ? (
                                    <>
                                        <Loader2 className='size-4 animate-spin mr-2' />
                                        Loading...
                                    </> 
                                    ) : (
                                        "Create Account"
                                    )}
                                </button>
                </form>
            {/* link og login  */}
                      <div className="text-center">
                        <p className='text-base-content/60'>
                                Already have an account?
                                <Link to="/login" className='link link-primary ml-1'>
                                Sign in
                                </Link>
                            </p>
                    </div>              
            </div>
        </div>

        {/* right side of the signup page  */}

        <AuthImagePattern 
                title="Join our VibeChat Community"
                subtitle="Connect with friends, family, and new people around the world. Share your thoughts"
        />

    </div>
  )
}

export default SignUpPage
