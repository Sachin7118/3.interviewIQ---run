import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/Auth';

function AuthModel({ onClose, onSuccess }) {
    const { userData } = useSelector((state) => state.user)

    useEffect(() => {
        if (userData) {
            onClose()
        }
    }, [userData, onClose])

    const handleSuccess = (user) => {
        if (onSuccess) {
            onSuccess(user)
        }
        onClose()
    }

    return (
        <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/10 backdrop-blur-sm px-4'>
            <div className='relative w-full max-w-md'>
                <button
                    onClick={onClose}
                    className='absolute top-8 right-5 text-gray-800 hover:text-black text-xl cursor-pointer z-10'>
                    <FaTimes size={18} />
                </button>
                <Auth isModel={true} onSuccess={handleSuccess} />
            </div>
        </div>
    )
}

export default AuthModel
