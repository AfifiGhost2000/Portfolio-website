import React from 'react';
import { motion } from 'framer-motion';
import './hireme.css';

// Tech stack data
const techStack = {
  frontend: [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'TailwindCSS', icon: '🎨' },
    { name: 'Framer Motion', icon: '🎭' },
    { name: 'React Query', icon: '🔄' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'React Native', icon: '📱' },
    { name: 'Expo', icon: '🚀' },
  ],
  backend: [
    { name: 'Node.js', icon: '🟢' },
    { name: 'Express.js', icon: '⚡' },
    { name: 'tRPC', icon: '🔌' },
  ],
  databases: [
    { name: 'MySQL', icon: '🗄️' },
    { name: 'Redis', icon: '🔴' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'MongoDB', icon: '🍃' },
  ],
  devops: [
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Git', icon: '📦' },
  ],
};

// Add preferences data
const preferences = [
  {
    title: "Amazing work culture",
    description: "It's fair to say I've been spoilt by the amazing work culture at my previous companies. I'd love to work at a place that values its employees and their well-being."
  },
  {
    title: "Remote first",
    description: "I value the flexibility and comfort of working from anywhere. A company that supports remote work is a big plus for me."
  },
  {
    title: "Familiar Tech stack",
    description: "I believe in using the right tool for the right job, and so far I've been able to pick up new technologies fairly quickly."
  },
  {
    title: "Fair compensation",
    description: "I won't lie, I love getting fairly paid, for the work I do. But that's not my only incentive, anything but my side projects are a testament to that."
  }
];

// Add dream companies data
const dreamCompanies = [
  {
    name: "Apple",
    logo: "/icons/apple.png"
  },
  {
    name: "Google",
    logo: "/icons/google.png"
  },
  {
    name: "Meta",
    logo: "/icons/meta.png"
  },
  {
    name: "Microsoft",
    logo: "/icons/microsoft.png"
  },
  {
    name: "Amazon",
    logo: "/icons/amazon.png"
  }
];



const CompanyCard = ({ name, logo }) => (
  <div className="company-card">
    <img src={logo} alt={`${name} logo`} className="company-logo" />
    <p className="company-name">{name}</p>
  </div>
);




const PreferenceItem = ({ icon, title, description }) => (
  <div className="preference-item">
    <div className="preference-icon">{icon}</div>
    <div>
      <h4 className="preference-title">{title}</h4>
      <p className="preference-description">{description}</p>
    </div>
  </div>
);



const TechCard = ({ title, items }) => {
  return (
    <motion.div
      className="tech-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3>{title}</h3>
      <div className="tech-items">
        {items.map((item, index) => (
          <div key={index} className="tech-item">
            <span className="tech-icon">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <motion.div
        className="corner-decoration"
        animate={{ rotate: [0, 15, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

const HireMe = () => {
  return (
    <>

      <h1 className='hiremetitle'>Let's work together</h1>
      <p className="subtitle">
        I'm always excited about new opportunities to create amazing digital experiences. Whether
        you're looking for a full-time engineer or need help with a specific project, I'd love to hear
        from you.
      </p>

      <section className="tech-stack">
        <h2>My Tech Stack</h2>
        <p>Technologies that I use to get the job done.</p>

        <div className="tech-cards">
          <TechCard title="Frontend" items={techStack.frontend} />
          <TechCard title="Backend" items={techStack.backend} />
          <TechCard title="Databases" items={techStack.databases} />
          <TechCard title="DevOps" items={techStack.devops} />
        </div>
      </section>

      <section className="why-hire-me">
        <h2 className='whyhiremetitle'>Why must you hire me?</h2>
        <ul>
          <li>
            Well, hiring me comes with a complimentary package of unparalleled wit, a knack for turning challenges into well, still challenges but
            with a lot of humor, and a passion for delivering with everything I build.
          </li>
          <li>
            Jokes aside, I've worked among the leading engineering teams in India. I also have experience working in various sectors ranging
            from food-tech, ed-tech to fin-tech.
          </li>
          <li>
            I am a quick learner and I am always looking to learn new things. I can work independently and I love a challenge.
          </li>
        </ul>
      </section>

      <section className="preferences">
        <h2>My preferences</h2>
        <div className="preferences-grid">
          {preferences.map((pref, index) => (
            <PreferenceItem 
              key={index}
              title={pref.title}
              description={pref.description}
            />
          ))}
        </div>
      </section>



      <section className="contact-section">
        <h2 style={{marginBottom:"12px"}}>Ready to start a conversation?</h2>
        <p>Reach out at <a href="mailto:abdulrahmanafifi33@gmail.com">abdulrahmanafifi33@gmail.com</a></p>
        <p className="tagline"><em>Let's create something extraordinary together!</em></p>
      </section>

    </>

  );
};

export default HireMe;