import React from "react";
import { useNavigate } from 'react-router-dom';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DescriptionIcon from '@mui/icons-material/Description';
import { Card } from 'react-bootstrap';
import "./main.css";

const experiences = [
  {
    title: "SuperProf",
    role: "ML/Data analyst/CS Tutor",
    period: "Dec 2024 — Present",
    icon: "/icons/Logo-superprof.png" 
  },
  {
    title: "3D Solution",
    role: "Mobile App Developer",
    period: "Oct 2024 — Nov 2024",
    icon: "/icons/3DSolution-logo.png"
  },
  {
    title: "EarTech IT",
    role: "DevOps Intern",
    period: "Aug 2023 — May 2024",
    icon: "/icons/EarTech-logo.png"
  }
];

const WorkExperience = () => {

  const navigate = useNavigate();

  const handleDownloadResume = () => {
    // Create the download link
    const link = document.createElement('a');
    link.href = '.././assets/Abdulrahman_Afifi_Resume.pdf';
    link.download = 'Abdulrahman_Afifi_Resume.pdf'; // This will be the downloaded file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="card">
      <header className="card-header">
        <div className="card-title">
          <BusinessCenterIcon className="icon" color="primary" />
          <span>Work</span>
        </div>
        <button 
        className="card-link" 
        onClick={()=>navigate('/hireme')}>Hire Me
        </button>
      </header>
      <div className="card-body">
        {experiences.map((exp, index) => (
          <div className="experience-item" key={index}>
            <img src={exp.icon} alt="logo" className="exp-icon" />
            <div>
              <h3 className="exp-title">{exp.title}</h3>
              <p className="exp-role">{exp.role}</p>
              <p className="exp-period">{exp.period}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="download-resume">
        <button className="resume-btn" onClick={handleDownloadResume}>
          <DescriptionIcon className="resume-icon" />
          Download Resume
        </button>
      </div>
    </Card>
  );
};

export default WorkExperience;
