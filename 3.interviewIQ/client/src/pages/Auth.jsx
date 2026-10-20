import React, { useState, useEffect } from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';

function Auth({ isModel = false, onSuccess }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { userData } = useSelector((state) => state.user)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!isModel && userData) {
            const redirectPath = location.state?.from || "/"
            navigate(redirectPath, { replace: true })
        }
    }, [userData, isModel, navigate, location.state])

    const handleGoogleAuth = async () => {
        if (loading) return
        setLoading(true)
        setError("")

        try {
            console.log("Initiating Google Sign-In with popup...", {
                currentHost: window.location.hostname,
                currentOrigin: window.location.origin
            })

            const response = await signInWithPopup(auth, provider)
            const user = response.user
            const name = user.displayName || user.email?.split('@')[0] || "User"
            const email = user.email

            console.log("Firebase OAuth succeeded, syncing with backend:", `${ServerUrl}/api/auth/google`)

            const result = await axios.post(
                ServerUrl + "/api/auth/google",
                { name, email },
                { withCredentials: true }
            )

            dispatch(setUserData(result.data))

            if (onSuccess) {
                onSuccess(result.data)
            }

            if (!isModel) {
                const target = location.state?.from || "/"
                navigate(target, { replace: true })
            }
        } catch (err) {
            console.error("Google Auth error details:", {
                code: err.code,
                message: err.message,
                status: err.response?.status,
                data: err.response?.data,
                hostname: window.location.hostname,
                origin: window.location.origin,
                rawError: err
            })
            dispatch(setUserData(null))

            if (err.code === "auth/popup-closed-by-user") {
                setError("Sign-in popup was closed before completing. Please try again.")
            } else if (err.code === "auth/cancelled-popup-request") {
                setError("Sign-in was cancelled. Please try again.")
            } else if (err.code === "auth/unauthorized-domain") {
                const hostname = window.location.hostname || "current domain"
                setError(`This domain (${hostname}) is not authorized in Firebase Console.`)
            } else if (err.response?.data?.message) {
                setError(err.response.data.message)
            } else if (err.message) {
                setError(err.message)
            } else {
                setError("Authentication failed. Please check your network and try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`
      w-full 
      ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}
    `}>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05 }}
                className={`
        w-full 
        ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
        bg-white shadow-2xl border border-gray-200
      `}>
                <div className='flex items-center justify-center gap-3 mb-6'>
                    <div className='bg-black text-white p-2 rounded-lg'>
                        <BsRobot size={18} />
                    </div>
                    <h2 className='font-semibold text-lg'>InterviewIQ.AI</h2>
                </div>

                <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
                    Continue with
                    <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
                        <IoSparkles size={16} />
                        AI Smart Interview
                    </span>
                </h1>

                <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
                    Sign in to start AI-powered mock interviews,
                    track your progress, and unlock detailed performance insights.
                </p>

                {error && (
                    <div className='bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6 text-center leading-relaxed'>
                        {error}
                    </div>
                )}

                <motion.button
                    onClick={handleGoogleAuth}
                    disabled={loading}
                    whileHover={!loading ? { opacity: 0.9, scale: 1.03 } : {}}
                    whileTap={!loading ? { opacity: 1, scale: 0.98 } : {}}
                    className={`w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md ${
                        loading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
                    }`}>
                    <FcGoogle size={20} />
                    {loading ? "Signing in..." : "Continue with Google"}
                </motion.button>
            </motion.div>
        </div>
    )
}

export default Auth
