import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './articleDetail.css';
import { FaArrowLeft } from 'react-icons/fa'; // Example with React Icons

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  const formatContent = (htmlContent) => {
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const elements = [];
    let key = 0;

    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();
        const children = Array.from(node.childNodes).map(child => processNode(child));

        switch (tagName) {
          case 'p':
            return (
              <p key={key++} className="mb-6 text-gray-700 leading-relaxed text-lg">
                {children}
              </p>
            );

          case 'h1':
            return (
              <h1 key={key++} className="text-4xl font-bold mb-8 text-gray-900 leading-tight">
                {children}
              </h1>
            );

          case 'h2':
            return (
              <h2 key={key++} className="text-3xl font-bold mb-6 mt-12 text-gray-900 leading-tight">
                {children}
              </h2>
            );

          case 'h3':
            return (
              <h3 key={key++} className="text-2xl font-bold mb-4 mt-10 text-gray-900 leading-tight">
                {children}
              </h3>
            );

          case 'h4':
            return (
              <h4 key={key++} className="text-xl font-bold mb-3 mt-8 text-gray-900">
                {children}
              </h4>
            );

          case 'strong':
          case 'b':
            return <strong key={key++} className="font-semibold text-gray-900">{children}</strong>;

          case 'em':
          case 'i':
            return <em key={key++} className="italic text-gray-700">{children}</em>;

          case 'ul':
            return (
              <ul key={key++} className="mb-6 space-y-3 pl-6">
                {children}
              </ul>
            );

          case 'ol':
            return (
              <ol key={key++} className="mb-6 space-y-3 pl-6 list-decimal">
                {children}
              </ol>
            );

          case 'li':
            return (
              <li key={key++} className="text-gray-700 leading-relaxed text-lg relative">
                <span className="absolute -left-6 text-blue-500 font-bold">•</span>
                {children}
              </li>
            );

          case 'pre':
            // Check if this is part of a consecutive group of pre tags
            let consecutivePreContent = [];
            let siblings = Array.from(node.parentNode.children);
            let currentIndex = siblings.indexOf(node);

            // Find the start of consecutive pre tags
            let startIndex = currentIndex;
            while (startIndex > 0 && siblings[startIndex - 1].tagName.toLowerCase() === 'pre') {
              startIndex--;
            }

            // Only render if this is the first pre in a consecutive sequence
            if (currentIndex !== startIndex) {
              return null; // Skip rendering, already handled by first pre
            }

            // Collect all consecutive pre tags starting from this one
            let index = startIndex;
            while (index < siblings.length && siblings[index].tagName.toLowerCase() === 'pre') {
              let preContent = siblings[index].innerHTML || siblings[index].textContent || '';

              // Convert HTML entities and br tags to proper formatting
              preContent = preContent
                .replace(/<br\s*\/?>/gi, '\n')  // Convert <br> to newlines
                .replace(/&lt;/g, '<')          // Convert &lt; to <
                .replace(/&gt;/g, '>')          // Convert &gt; to >
                .replace(/&amp;/g, '&')         // Convert &amp; to &
                .replace(/&quot;/g, '"')        // Convert &quot; to "
                .replace(/&#39;/g, "'")         // Convert &#39; to '
                .replace(/<[^>]*>/g, '')        // Remove any remaining HTML tags
                .trim();

              consecutivePreContent.push(preContent);
              index++;
            }

            // Combine all consecutive pre content
            const combinedContent = consecutivePreContent.join('\n\n');

            return (
              <div key={key++} className="mb-8 mt-6">
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-800 px-4 py-2 text-gray-300 text-sm font-medium border-b border-gray-700">
                    Code
                  </div>
                  <pre className="p-6 overflow-x-auto text-sm text-left">
                    <code className="text-green-400 font-mono leading-relaxed whitespace-pre block">
                      {combinedContent}
                    </code>
                  </pre>
                </div>
              </div>
            );

          case 'code':
            // Inline code
            if (node.parentNode && node.parentNode.tagName.toLowerCase() !== 'pre') {
              return (
                <code key={key++} className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return children;

          case 'figure':
            const img = node.querySelector('img');
            const figcaption = node.querySelector('figcaption');

            return (
              <figure key={key++} className="mb-8 mt-6">
                {img && (
                  <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-50">
                    <img
                      src={img.src}
                      alt={img.alt || ''}
                      className="w-full h-auto object-cover"
                      style={{ maxHeight: '500px' }}
                    />
                  </div>
                )}
                {figcaption && (
                  <figcaption className="text-center text-gray-600 text-sm mt-3 italic">
                    {figcaption.textContent}
                  </figcaption>
                )}
              </figure>
            );

          case 'img':
            // Handle standalone images
            if (node.parentNode && node.parentNode.tagName.toLowerCase() !== 'figure') {
              return (
                <div key={key++} className="mb-8 mt-6">
                  <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-50">
                    <img
                      src={node.src}
                      alt={node.alt || ''}
                      className="w-full h-auto object-cover"
                      style={{ maxHeight: '500px' }}
                    />
                  </div>
                </div>
              );
            }
            return null;

          case 'a':
            return (
              <a
                key={key++}
                href={node.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors"
              >
                {children}
              </a>
            );

          case 'blockquote':
            return (
              <blockquote key={key++} className="border-l-4 border-blue-500 pl-6 py-4 mb-6 bg-blue-50 italic text-gray-700">
                {children}
              </blockquote>
            );

          default:
            return <span key={key++}>{children}</span>;
        }
      }
    };

    Array.from(tempDiv.childNodes).forEach(node => {
      const element = processNode(node);
      if (element) {
        elements.push(element);
      }
    });

    return elements;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@abdulrahmanafifi33'
      );
      const data = await res.json();
      const withSlugs = data.items.map((a) => ({
        ...a,
        slug: a.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-')
          .slice(0, 50),
      }));

      const found = withSlugs.find((a) => a.slug === slug);
      setArticle(found || null);
    };

    fetchArticle();
  }, [slug]);

  if (!article) return <p>Article not found.</p>;

  return (
    <div>
      {/* Back button + Date in same row */}
      <div className="flex items-center gap-25">
        <button
          type="button"
          aria-label="Go back to articles"
          onClick={() => navigate(-1)}
          className="back-btn group"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
          >
            <path
              d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span className="text-sm text-zinc-500 dark:text-zinc-400 article-date">

          {new Date(article.pubDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>

      {/* Title */}
      <h1
        className="mt-16 ml-25 text-4xl font-bold tracking-tight sm:text-5xl"
        style={{ color: 'var(--title)', marginLeft: '6.25rem' }}
      >
        {article.title}
      </h1>

      {/* Content */}
      <div
        className="mt-8 pt-6 prose prose-lg max-w-none text-xl dark:prose-invert dark:prose-hr:border-zinc-800"
        style={{ marginLeft: '6.25rem', marginBottom: "5rem" }}
      >
        {formatContent(article.content)}
      </div>
    </div>
  );
};

export default ArticleDetail;