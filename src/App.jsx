import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/1-header/Header';
import Projects from './components/3c-projects/Projects';
import Hero from './components/2-hero/Hero';
import Main from './components/3-main/Main';
import HireMe from './components/3d-hireme/HireMe';
import Contact from './components/4-contact/Contact';
import Footer from './components/5-footer/Footer';
import About from './components/3a-about/About';
import Articles from './components/3b-articles/Articles';
import ArticleDetail from './components/3e-article_details/articleDetail';

import ScrollToTop from './utils/scrollToTop';

function App() {
  const [showScrollBtn, setShowScrollButton] = useState(false);

  // Detect scroll for the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowScrollButton(true);
      else setShowScrollButton(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Get the current route location
  const location = useLocation();

  return (
    <div id="up" className="container">
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <div className="divider" />
            <Main />
            <div className="divider" />
            <Contact />
            <div className="divider" />
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/hireme" element={<HireMe />} />
      </Routes>

      <Footer />

      {/* Scroll-to-top button */}
      <a style={{ opacity: showScrollBtn ? 1 : 0, transition: '1s' }} href="#up">
        <button className="icon-keyboard_arrow_up scroll2Top"></button>
      </a>
    </div>
  );
}

// Wrap the App component with Router
function AppWrapper() {
  return (
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  );
}

export default AppWrapper;
