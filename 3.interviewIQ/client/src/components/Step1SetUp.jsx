import React, { useState } from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
    FaSpinner,
    FaFilePdf,
    FaTrashAlt,
    FaCheckCircle,
} from "react-icons/fa";
import axios from "axios"
import { ServerUrl } from '../App';
import { useSelector } from 'react-redux';

function Step1SetUp({ onStart }) {
    const { userData } = useSelector((state) => state.user);
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingStage, setLoadingStage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
                setErrorMessage("Please select a valid PDF file.");
                return;
            }
            setResumeFile(file);
            setErrorMessage("");
        }
    };

    const handleStart = async () => {
        setErrorMessage("");

        if (!userData) {
            setErrorMessage("Please log in to start an interview.");
            return;
        }

        // If no resume attached, role and experience are required
        if (!resumeFile && (!role.trim() || !experience.trim())) {
            setErrorMessage("Please enter both Role and Experience, or attach a resume.");
            return;
        }

        setLoading(true);

        let finalRole = role.trim();
        let finalExperience = experience.trim();
        let finalProjects = [];
        let finalSkills = [];
        let finalResumeText = "";

        // If a resume file is attached, analyze it automatically in the flow
        if (resumeFile) {
            setLoadingStage("Analyzing resume...");
            try {
                const formData = new FormData();
                formData.append("resume", resumeFile);

                const resumeRes = await axios.post(
                    ServerUrl + "/api/interview/resume",
                    formData,
                    { withCredentials: true }
                );

                if (resumeRes.data) {
                    if (!finalRole && resumeRes.data.role) {
                        finalRole = resumeRes.data.role;
                        setRole(finalRole);
                    }
                    if (!finalExperience && resumeRes.data.experience) {
                        finalExperience = resumeRes.data.experience;
                        setExperience(finalExperience);
                    }
                    finalProjects = resumeRes.data.projects || [];
                    finalSkills = resumeRes.data.skills || [];
                    finalResumeText = resumeRes.data.resumeText || "";
                }
            } catch (err) {
                console.warn("Resume analysis failed, continuing with entered details:", err);
                if (!finalRole || !finalExperience) {
                    setErrorMessage("Could not parse resume. Please enter Role and Experience manually.");
                    setLoading(false);
                    setLoadingStage("");
                    return;
                }
            }
        }

        if (!finalRole || !finalExperience) {
            setErrorMessage("Please enter your Role and Experience to begin.");
            setLoading(false);
            setLoadingStage("");
            return;
        }

        setLoadingStage("Generating interview questions...");

        try {
            const result = await axios.post(
                ServerUrl + "/api/interview/generate-questions",
                {
                    role: finalRole,
                    experience: finalExperience,
                    mode,
                    resumeText: finalResumeText,
                    projects: finalProjects,
                    skills: finalSkills
                },
                { withCredentials: true }
            );

            setLoading(false);
            setLoadingStage("");
            onStart(result.data);

        } catch (error) {
            console.error("Start interview error:", error);
            const msg = error.response?.data?.message || "Failed to start interview. Please try again.";
            setErrorMessage(msg);
            setLoading(false);
            setLoadingStage("");
        }
    };

    const isStartDisabled = loading || (!resumeFile && (!role.trim() || !experience.trim()));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-8'>

            <div className='w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden'>

                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className='relative bg-gradient-to-br from-green-50 to-green-100 p-12 flex flex-col justify-center'>

                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Start Your AI Interview
                    </h2>

                    <p className="text-gray-600 mb-10">
                        Practice real interview scenarios powered by AI.
                        Improve communication, technical skills, and confidence.
                    </p>

                    <div className='space-y-5'>
                        {[
                            {
                                icon: <FaUserTie className="text-green-600 text-xl" />,
                                text: "Choose Role & Experience",
                            },
                            {
                                icon: <FaMicrophoneAlt className="text-green-600 text-xl" />,
                                text: "Smart Voice Interview",
                            },
                            {
                                icon: <FaChartLine className="text-green-600 text-xl" />,
                                text: "Performance Analytics",
                            },
                        ].map((item, index) => (
                            <motion.div key={index}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + index * 0.15 }}
                                whileHover={{ scale: 1.03 }}
                                className='flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm cursor-pointer'>
                                {item.icon}
                                <span className='text-gray-700 font-medium'>{item.text}</span>
                            </motion.div>
                        ))}
                    </div>

                </motion.div>

                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="p-12 bg-white flex flex-col justify-center">

                    <h2 className='text-3xl font-bold text-gray-800 mb-6'>
                        Interview Setup
                    </h2>

                    <div className='space-y-5'>

                        <div className='relative'>
                            <FaUserTie className='absolute top-4 left-4 text-gray-400' />
                            <input
                                type='text'
                                placeholder='Enter role (e.g. Frontend Developer)'
                                className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition'
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    if (errorMessage) setErrorMessage("");
                                }}
                                value={role}
                            />
                        </div>

                        <div className='relative'>
                            <FaBriefcase className='absolute top-4 left-4 text-gray-400' />
                            <input
                                type='text'
                                placeholder='Experience (e.g. 2 years or Fresher)'
                                className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition'
                                onChange={(e) => {
                                    setExperience(e.target.value);
                                    if (errorMessage) setErrorMessage("");
                                }}
                                value={experience}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                Interview Mode
                            </label>
                            <select
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                                className='w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition text-gray-700 bg-white'>
                                <option value="Technical">Technical Interview</option>
                                <option value="HR">HR Interview</option>
                            </select>
                        </div>

                        {/* Resume upload area */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                Resume (Optional)
                            </label>
                            <input
                                type="file"
                                accept="application/pdf"
                                id="resumeUploadInput"
                                disabled={loading}
                                className='hidden'
                                onChange={handleFileChange}
                            />

                            {!resumeFile ? (
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => !loading && document.getElementById("resumeUploadInput").click()}
                                    className='border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-green-500 hover:bg-green-50/40 transition'>
                                    <FaFileUpload className='text-3xl mx-auto text-green-600 mb-2' />
                                    <p className='text-gray-700 font-medium text-sm'>
                                        Click to upload resume (PDF)
                                    </p>
                                    <p className='text-xs text-gray-400 mt-1'>
                                        Tailors interview questions to your skills & projects
                                    </p>
                                </motion.div>
                            ) : (
                                <div className='border border-green-200 bg-green-50/60 rounded-xl p-4 flex items-center justify-between'>
                                    <div className='flex items-center space-x-3 overflow-hidden'>
                                        <FaFilePdf className='text-3xl text-red-500 flex-shrink-0' />
                                        <div className='overflow-hidden text-left'>
                                            <p className='text-sm font-semibold text-gray-800 truncate'>
                                                {resumeFile.name}
                                            </p>
                                            <p className='text-xs text-gray-500 flex items-center gap-1.5 mt-0.5'>
                                                <FaCheckCircle className="text-green-600 text-[11px]" />
                                                <span>{(resumeFile.size / 1024).toFixed(1)} KB &bull; Ready to start</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
                                        <button
                                            type="button"
                                            disabled={loading}
                                            onClick={() => document.getElementById("resumeUploadInput").click()}
                                            className='text-xs text-green-700 font-medium hover:underline px-2 py-1'>
                                            Change
                                        </button>
                                        <button
                                            type="button"
                                            disabled={loading}
                                            onClick={() => setResumeFile(null)}
                                            className='text-xs text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50 transition'
                                            title="Remove resume">
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {errorMessage && (
                            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        <motion.button
                            onClick={handleStart}
                            disabled={isStartDisabled}
                            whileHover={!isStartDisabled ? { scale: 1.02 } : {}}
                            whileTap={!isStartDisabled ? { scale: 0.98 } : {}}
                            className='w-full disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl text-base font-semibold transition duration-300 shadow-md flex items-center justify-center gap-2'>
                            {loading && <FaSpinner className="animate-spin" />}
                            {loading ? (loadingStage || "Starting Interview...") : "Start Interview"}
                        </motion.button>
                    </div>

                </motion.div>
            </div>

        </motion.div>
    );
}

export default Step1SetUp;
