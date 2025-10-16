import React, { useEffect, useState } from 'react';
import './main.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Articles() {
  const [articles, setArticles] = useState([]);
  const MAX_CARDS_TO_DISPLAY = 4;

  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '') // Remove punctuation
      .replace(/\s+/g, '-')     // Replace spaces with -
      .slice(0, 50);            // Limit slug length if needed


    useEffect(() => {
      const fetchMediumArticles = async () => {
        try {
          const res = await fetch(
            'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@abdulrahmanafifi33'
          );
          const data = await res.json();

          const withSlugs = data.items.map((article) => ({
            ...article,
            slug: generateSlug(article.title) || article.guid.split('/').pop(), // fallback to GUID part
          }));

          setArticles(withSlugs);
        } catch (error) {
          console.error('Error fetching Medium articles:', error);
        }
      };

      fetchMediumArticles();
    }, []);

  const cleanDescription = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
  
    // Remove all <figure> elements
    const figures = doc.querySelectorAll('figure');
    figures.forEach((fig) => fig.remove());
  
    return doc.body.innerHTML;
  };
  


  return (
    <div className="my-5">
      <Row className="g-4">
        {articles.map((article, index) => (
          <Col key={index} xs={12} md={6} lg={6}>
            <Card className="article-card">
              <Card.Body>
                <div className="card-date">{new Date(article.pubDate).toDateString()}</div>
                <Link to={`/articles/${article.slug}`} >
                  <h3 className="card-title">{article.title}</h3>
                  <p
                    className="card-description"
                    dangerouslySetInnerHTML={{
                      __html: cleanDescription(article.description).slice(0, 150) + '...',
                    }}
                  />
                  <span className="read-more">
                    Read More 
                  </span>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Articles;
