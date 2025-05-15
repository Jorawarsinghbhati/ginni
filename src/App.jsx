import { useState } from 'react'
import './App.css'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [response, setResponse] = useState(null) // null | 'accepted' | 'notAccepted'

  const headerText = {
    null: "I'm Really Sorry, Ginnii",
    accepted: "Thank You, Ginnii 💖",
    notAccepted: "I Understand, Ginnii",
  }

  // Change state first, then send email async (don’t block UI)
  const handleResponse = (status) => {
    setResponse(status)
    sendEmail(status)
  }

  const sendEmail = (status) => {
    const templateParams = {
      to_name: 'Jorawar_singh',
      from_name: 'Ginni_chaudhary...',
      message: status === 'accepted'
        ? 'She accepted the apology.'
        : 'She did NOT accept the apology.',
    }

    emailjs
      .send(
        'service_hg7j6fq', // Your EmailJS Service ID
        'template_nwkmees', // Your EmailJS Template ID
        templateParams,
        'J1KE3-nvQ3-N0BEyl' // Your EmailJS Public Key
      )
      .then(
        (response) => {
          console.log('Email sent successfully!', response.status, response.text)
        },
        (err) => {
          console.error('Email sending failed...', err)
        }
      )
  }

  return (
    <>
      {/* Fancy fixed header */}
      <header className="fixed top-0 left-0 w-full bg-[#121212cc] backdrop-blur-md shadow-lg z-20 py-4 px-6 flex justify-center items-center select-none">
        <AnimatePresence mode="wait">
          <motion.h1
            key={response ?? 'null'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`text-2xl md:text-3xl font-extrabold tracking-wide text-pink-400 relative`}
          >
            {headerText[response ?? 'null']}
            {response === 'accepted' && <GlowingUnderline />}
            {response === 'accepted' && <Sparkles />}
          </motion.h1>
        </AnimatePresence>
      </header>

      {/* Main content */}
      <div
        className="min-h-screen flex items-center justify-center p-4 bg-[#121212]"
        style={{
          backgroundImage: "url('your-background-image.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          paddingTop: '80px', // To avoid header overlap
        }}
      >
        <AnimatePresence mode="wait">
          {!response && (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 50, rotateX: 10, rotateY: 0 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1e1e1e] bg-opacity-90 rounded-3xl shadow-2xl max-w-lg w-full p-8 text-center border border-pink-600
                transform-gpu
                hover:rotateX-3 hover:rotateY-3 hover:scale-105
                transition-transform duration-500 ease-out
                cursor-pointer
              "
              onMouseMove={e => {
                const card = e.currentTarget
                const rect = card.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                const centerX = rect.width / 2
                const centerY = rect.height / 2
                const rotateX = ((y - centerY) / centerY) * 10
                const rotateY = ((x - centerX) / centerX) * 10
                card.style.transform = `perspective(600px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)'
              }}
            >
              <p className="text-pink-100 mb-6 text-base leading-relaxed">
                I know I made a mistake, and it hurts me knowing I let you down. 
                You're a great friend and I truly hope you can forgive me.
              </p>

              <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-pink-200 overflow-hidden border-2 border-pink-500">
                <img
                  src="ginni.jpeg"
                  alt="Ginni"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex justify-center gap-6">
                <button
                  onClick={() => handleResponse('accepted')}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-lg"
                >
                  Accept Apology
                </button>
                <button
                  onClick={() => handleResponse('notAccepted')}
                  className="bg-gray-700 hover:bg-gray-800 text-pink-400 font-semibold py-2 px-6 rounded-full border border-pink-600 transition duration-300 shadow-lg"
                >
                  Not Yet
                </button>
              </div>
            </motion.div>
          )}

          {response === 'accepted' && (
            <motion.div
              key="accepted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-lg px-6"
            >
              <p className="text-pink-100 text-base mb-6">
                I’m grateful . Thank you for understanding and being the amazing friend you are.
              </p>
              <ConfettiEffect />
            </motion.div>
          )}

          {response === 'notAccepted' && (
            <motion.div
              key="notAccepted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-lg px-6"
            >
              <p className="text-pink-100 text-base mb-6">
                I’ll keep trying to be a better friend.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

function GlowingUnderline() {
  return (
    <motion.span
      layoutId="underline"
      className="block absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full bg-pink-400 shadow-[0_0_8px_2px_rgb(244,114,182)]"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 0.5 }}
      style={{ bottom: '-8px' }}
    />
  )
}

function Sparkles() {
  const sparkles = Array.from({ length: 8 })

  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-10 pointer-events-none flex justify-between items-center mt-2">
      {sparkles.map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_6px_2px_rgb(244,114,182)]"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [-2, 2, -2] }}
          transition={{
            duration: 1.5,
            delay: i * 0.15,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      ))}
    </div>
  )
}

function ConfettiEffect() {
  const confetti = Array.from({ length: 30 })

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-10">
      {confetti.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: '100vh', opacity: 1 }}
          transition={{
            delay: i * 0.1,
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            color: ['#f472b6', '#f9a8d4', '#fb7185'][i % 3],
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  )
}

export default App
