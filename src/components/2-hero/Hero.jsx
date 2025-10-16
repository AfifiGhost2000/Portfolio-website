import React, { useEffect } from 'react'
import "./hero.css"
import {useRef} from 'react'
import Lottie from 'lottie-react'
import devAnimation from "../../animation/dev.json"
import { motion } from "framer-motion"

export default function Hero() {

  const lottieRef = useRef();

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.5);
      lottieRef.current.play();
    }
  }, []);

  return (
    <section className='hero flex'>
      <div className='left-section'>

        <div className='parent-avatar flex'>
          <motion.img
          initial={{transform: "scale(0)"}}
          animate={{transform: "scale(1.1)"}}
          transition={{damping: 6, type:"spring", stiffness: 100 }}
           src="./me.png" className='avatar' alt="" />
          <div className='icon-verified'></div>
        </div>

        <motion.h1 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:2}}
        
        className='title'>
          Full Stack Software Developer
        </motion.h1>
        <p className='subtitle'>Crafting Seamless Digital Experiences—From Vision to Reality!</p>
        <p className='description'> I am passionate about designing and developing seamless, scalable applications that enhance user experience, optimize performance, and bridge the gap between frontend and backend systems.</p>
        <p className='description'> 
                  Looking for a passionate software engineer to bring your ideas to life? Let's collaborate and create innovative solutions!  
                  Scroll down and dive deep into my virtual portfolio.</p>
        <div className="all-icons flex">
          <div className="icon icon-twitter"></div>
          <div className="icon icon-instagram"></div>
          <div className="icon icon-github"></div>
          <div className="icon  icon-linkedin"></div>
        </div>

      </div>

      <div className='right-section animation'>



 

        <Lottie 
          lottieRef={lottieRef}
          animationData={devAnimation}
          className="dev-animation" 
          style={{ width: 300, height: 300 }}
          loop={true}
        />
      </div>
      
    </section>
  )
}
