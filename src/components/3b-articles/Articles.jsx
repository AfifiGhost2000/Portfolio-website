import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import './articles.css';

import { myArticles, myArticlesReady } from '../myArticles';


const TimelineItem = ({ article, index }) => {
  const itemRef = useRef(null);
  const [isInView, setIsInView] = useState(index < 4); // Always show if index < 4

  useEffect(() => {
    if (index < 4) return; // skip observing first 4

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [index]);

  const cleanDescription = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
  
    // Remove all <figure> elements
    const figures = doc.querySelectorAll('figure');
    figures.forEach((fig) => fig.remove());
  
    return doc.body.innerHTML;
  };

  return (
    <div ref={itemRef} className="timeline-item">
      {/* Timeline marker stays as-is */}
      <div className="timeline-marker">
        <motion.div
          className={`timeline-dot ${isInView ? 'active' : ''}`}
          animate={{
            scale: isInView ? 1 : 0.8,
            opacity: isInView ? 1 : 0.3
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Only this part animates in after scroll */}
      <motion.div
        className="timeline-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.6, delay: index * 0.08 }}
      >
        <div className="article-date">{new Date(article.pubDate).toDateString()}</div>
        <Link to={`/articles/${article.slug}`} className="article-link">
          <h3 className="article-title">{article.title}</h3>
          <p className="article-description" dangerouslySetInnerHTML={{
                      __html: cleanDescription(article.description).slice(0, 150) + '...',
                    }}/>
          <span className="read-more">Read article</span>
        </Link>
      </motion.div>
    </div>
  );
};


const Articles = () => {


  useEffect(() => {
    myArticlesReady.then(() => {
      // trigger a re-render if needed
      setSearch((s) => s); // or add local state to force refresh
    });
  }, []);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [sortOrder, setSortOrder] = useState('newest');
  const [search, setSearch] = useState('');
  const timelineRef = useRef(null);



  // Filter and sort logic
  const filteredArticles = useMemo(() => {
    let filtered = myArticles.filter(article =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase())
    );
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest'
        ? dateB - dateA
        : dateA - dateB;
    });
    return filtered;
  }, [search, sortOrder, myArticles]);

  return (
    <div className="articles-container" ref={containerRef}>
      <motion.h1
        className="articles-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        I write about things I'm learning and things I'm building
      </motion.h1>
      <motion.p
        className="articles-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        All of my long-form thoughts on programming, leadership, infrastructure, and more, collected in chronological order.
      </motion.p>

      <div className="articles-controls">
        <input
          className="articles-search"
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="articles-sort"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div className="timeline" ref={timelineRef}>
        <div className="timeline-line"></div>
        <motion.div
          className="timeline-progress"
          style={{
            scaleY: scaleX,
            originY: 0
          }}
        />
        {filteredArticles.map((article, index) => (
          <TimelineItem
            key={index}
            article={article}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Articles;