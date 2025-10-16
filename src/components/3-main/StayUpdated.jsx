import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import DescriptionIcon from '@mui/icons-material/Description';
import { Card } from 'react-bootstrap';
import "./main.css";
import { Input } from "@mui/material";


const StayUpdated = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would typically handle the email subscription
    // For now, we'll just simulate a submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <Card className="card">
      <header className="card-header">
        <div className="card-title">
          <MailIcon className="icon" color="primary" />
          <span>Stay up to date</span>
        </div>

      </header>
      <div className="card-body">
        <p className="subtitle">Get notified when I publish something new, and unsubscribe at any time.</p>
        <form onSubmit={handleSubmit} className="input-group-dark">
          <input
            className="input-dark"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="button-dark">
          {isSubmitting ? 'Joining...' : 'Join'}
          </button>
        </form>
      </div>


    </Card>
  );
};

export default StayUpdated;
