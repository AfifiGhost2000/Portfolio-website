// export const myArticles = [
//   {
//     date: "December 5, 2024",
//     title: "VS Code Remote Development",
//     description: "Use VS Code against a remote computer or container",
//     slug: "vs-code-remote-dev",
//     link: "/blog/vs-code-remote-dev"
//   },
//   {
//     date: "November 28, 2024",
//     title: "Building Scalable React Applications",
//     description: "Best practices for building large-scale React applications with performance in mind",
//     slug: "building-scalable-react-apps",
//     link: "/blog/scalable-react-apps"
//   },
//   {
//     date: "November 15, 2024",
//     title: "Modern JavaScript Development",
//     description: "Latest features and best practices in JavaScript development for 2024",
//     slug: "modern-javascript-2024",
//     link: "/blog/modern-javascript-2024"
//   },
//   {
//     date: "November 1, 2024",
//     title: "Mastering TypeScript",
//     description: "A comprehensive guide to TypeScript features and best practices",
//     slug: "mastering-typescript",
//     link: "/blog/mastering-typescript"
//   },
//   {
//     date: "October 20, 2024",
//     title: "Advanced CSS Techniques",
//     description: "Modern CSS features and techniques for better web development",
//     slug: "advanced-css-techniques",
//     link: "/blog/advanced-css"
//   },
//   {
//     date: "October 10, 2024",
//     title: "Web Performance Optimization",
//     description: "Strategies and tools for optimizing web application performance",
//     slug: "web-performance-optimization",
//     link: "/blog/web-performance"
//   },
//   {
//     date: "September 25, 2024",
//     title: "State Management in React",
//     description: "Comparing different state management solutions in React applications",
//     slug: "state-management-react",
//     link: "/blog/state-management"
//   },
//   {
//     date: "September 15, 2024",
//     title: "API Design Best Practices",
//     description: "Designing robust and scalable RESTful APIs",
//     slug: "api-design-best-practices",
//     link: "/blog/api-design"
//   },
//   {
//     date: "September 5, 2024",
//     title: "Testing React Applications",
//     description: "Comprehensive guide to testing React applications with Jest and React Testing Library",
//     slug: "testing-react-applications",
//     link: "/blog/testing-react"
//   },
//   {
//     date: "August 25, 2024",
//     title: "CSS Grid Layout",
//     description: "Mastering CSS Grid for modern web layouts",
//     slug: "css-grid-layout",
//     link: "/blog/css-grid"
//   },
//   {
//     date: "August 15, 2024",
//     title: "React Hooks Deep Dive",
//     description: "Understanding and implementing React Hooks effectively",
//     slug: "react-hooks-deep-dive",
//     link: "/blog/react-hooks"
//   },
//   {
//     date: "August 5, 2024",
//     title: "Web Security Essentials",
//     description: "Essential security practices for web applications",
//     slug: "web-security-essentials",
//     link: "/blog/web-security"
//   }
// ];


export let myArticles = []

const generateSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '') // Remove punctuation
    .replace(/\s+/g, '-')     // Replace spaces with -
    .slice(0, 50);            // Limit slug length if needed

// Fetch Medium articles without top-level await to satisfy build target
// Expose a Promise to allow consumers to know when data is ready if needed
export const myArticlesReady = fetch(
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@abdulrahmanafifi33'
)
  .then((res) => res.json())
  .then((data) => {
    const withSlugs = data.items.map((article) => ({
      ...article,
      slug: generateSlug(article.title) || article.guid.split('/').pop(),
    }));
    myArticles = withSlugs;
    return myArticles;
  })
  .catch((error) => {
    console.error('Error fetching Medium articles:', error);
    myArticles = [];
    return myArticles;
  });