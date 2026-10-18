import React from 'react'
import { FaArrowLeft, FaCheckCircle, FaRocket } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";

function Pricing() {
  const navigate = useNavigate()

  const freeFeatures = [
    "Unlimited AI Mock Interviews",
    "Smart AI Resume Analysis & Extraction",
    "HR & Technical Interview Modes",
    "Realistic AI Human Voice & Spoken Questions",
    "Real-time Speech Recognition & Voice Input",
    "Comprehensive Performance Evaluation & Scoring",
    "Full Question-wise Feedback & Tips",
    "Downloadable PDF Interview Reports",
    "Complete Interview History Tracking",
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-16 px-6'>

      <div className='max-w-4xl mx-auto mb-12 flex items-start gap-4'>
        <button onClick={() => navigate("/")} className='mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition cursor-pointer'>
          <FaArrowLeft className='text-gray-600' />
        </button>

        <div className="text-center w-full">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            <FaRocket className="text-emerald-600" />
            100% Free For Everyone
          </div>
          <h1 className="text-4xl font-bold text-gray-800">
            Unlimited AI Interviews
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            No credits, no subscriptions, no payment required. Practice as many interviews as you want.
          </p>
        </div>
      </div>

      <div className='max-w-xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl p-8 sm:p-10 border-2 border-emerald-500 shadow-2xl bg-white"
        >
          <div className="absolute top-6 right-6 bg-emerald-600 text-white text-xs px-4 py-1.5 rounded-full font-semibold shadow">
            Free Forever
          </div>

          <h3 className="text-2xl font-bold text-gray-800">
            Community Plan
          </h3>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-emerald-600">
              ₹0
            </span>
            <span className="text-gray-500 font-medium">/ Free Access</span>
          </div>

          <p className="text-gray-500 mt-4 text-sm leading-relaxed">
            Full unrestricted access to all AI interview modes, resume parsing, voice interviews, and analytics.
          </p>

          <div className="mt-8 space-y-3.5 text-left border-t border-gray-100 pt-6">
            {freeFeatures.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <FaCheckCircle className="text-emerald-500 text-base shrink-0" />
                <span className="text-gray-700 text-sm font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/interview")}
            className="w-full mt-8 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            Start Free Interview Now
          </button>
        </motion.div>
      </div>

    </div>
  )
}

export default Pricing

