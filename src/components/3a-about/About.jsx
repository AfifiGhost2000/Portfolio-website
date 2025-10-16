import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  FaLinkedin,
  FaGithub,
  FaMedium,
  FaDev,
  FaStackOverflow,
  FaMailBulk
} from "react-icons/fa";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { IoMdMail } from "react-icons/io";
import "./about.css";

const About = () => {

  const navigate = useNavigate();
  return (
    <section className="about-container flex">
      <div className="about-left">
      <motion.h1 
        className="about-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      > About me</motion.h1>

      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p>
          👋 Hey there! I'm Abdulrahman Afifi, an Egyptian software engineer. I hold a Computer Engineering degree from Bahcesehir University and have a diverse background in software development.
          My expertise lies in building scalable, user-friendly applications with a strong emphasis on security, performance, and seamless integration. 🚀
        </p>

        <p>
          My tech journey started with 3D design and game development in Unity using C#. Over time, I transitioned into software engineering,
          mastering languages like Java, C/C++, Python, R, and JavaScript. This has enabled me to gain expertise in full-stack development, cloud computing, and DevOps.
        </p>

        <p>
          Throughout my career, I’ve led and contributed to impactful projects, including my capstone project, where I developed a
          mobile app with robust authentication features and real-time server communication. 🔐📲 Additionally,
          my internship at EARTech IT in Istanbul provided hands-on experience in DevOps (MS Azure), version control, and project management methodologies
          such as Prosci and Change Management.
        </p>

        <p>
          Beyond technical skills, my participation in competitive programming has sharpened my problem-solving abilities,
          while my engagement in the McKinsey Forward Program has enhanced my digital literacy, adaptability, and cross-functional collaboration. 🔍💡
        </p>

        <p>
          I am passionate about leveraging technology to create inclusive and impactful solutions, ensuring that innovation
          remains accessible and empowering for all. 🌍✨
        </p>

        <p>
          If you’re looking for a software engineer who combines technical expertise with creative problem-solving and a user-centered approach, I’d love to explore how we can work together to bring your ideas to life.
        </p>
        <div />

        <p>
        Check out my{' '}
          <button 
            onClick={() => navigate('/hireme')}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              color: '#007bff',
              textDecoration: 'underline',
              padding: 0,
              font: 'inherit'
            }}
          >
            hire me
          </button>
          {' '}page
        </p>

        </motion.div>
        
      </div>

      <div className="about-right">
        <img src=".././images/MePresenting.jpg" alt="" className="about-photo" />
        <ul className="social-links">
          <li><a href="https://linkedin.com/in/abdulrahman-afifi-866596168" target="_blank" rel="noopener noreferrer"><FaLinkedin /> Follow on LinkedIn</a></li>
          <li><a href="https://github.com/AfifiGhost2000" target="_blank" rel="noopener noreferrer"><FaGithub /> Follow on GitHub</a></li>
          <li><a href="https://stackoverflow.com/users/9582119/powerful-blaster" target="_blank" rel="noopener noreferrer"><FaStackOverflow /> Follow on Stack Overflow</a></li>
          <li><a href="https://medium.com/@abdulrahmanafifi33" target="_blank" rel="noopener noreferrer"><FaMedium /> Follow on Medium</a></li>
          <li><a href="https://dev.to/abdulrahman_afifi_7cf33bf" target="_blank" rel="noopener noreferrer"><FaDev /> Follow on Dev.to</a></li>
          <li><a href="mailto:abdulrahmanafifi33@gmail.com" target="_blank" rel="noopener noreferrer"><IoMdMail /> abdulrahmanafifi33@gmail.com</a></li>
        </ul>
      </div>
    </section>
  );
};

export default About;