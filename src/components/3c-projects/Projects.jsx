import React, { useState } from 'react'
import './projects.css'
import { myProjects } from '../myProjects'
import { AnimatePresence, motion } from 'framer-motion';


export default function Projects() {

  // Track the index of the currently active button
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [arr, setArr] = useState(myProjects);
  // List of button labels for easier rendering and management
  const buttons = ['All Projects', 'Python', 'JavaScript', 'React & MUI', 'Node & Express'];

  const handleFilter = (label) => {
    if (label === 'All Projects') {
      // Show all projects if 'All Projects' is clicked
      setArr(myProjects);
    } else {
      // Convert the button label to an array of categories (e.g., 'HTML & CSS' -> ['html', 'css'])
      const labelCategories = label.toLowerCase().split(' & ');

      // Filter the projects based on whether their category array contains all the categories in the label
      const filteredProjects = myProjects.filter((project) =>
        labelCategories.every((cat) => project.category.includes(cat))
      );

      setArr(filteredProjects);
    }
  };


  return (
    <main className='flex'>
      <section className="flex left-section">

        {buttons.map((label, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveButtonIndex(index); // Set active button index on click
              handleFilter(label); // Apply filtering logic based on button label
            }}

            className={activeButtonIndex === index ? "active" : null} // Apply "active" class if index matches
          >
            {label}
          </button>
        ))}

      </section>

      <section className="flex right-section">

        <AnimatePresence>

          {arr.map((item, index) => {
            return (
              <motion.article
                layout
                initial={{ transform: "scale(0)" }}
                animate={{ transform: "scale(1)" }}
                transition={{ type: "spring", damping: 8, stiffness: 50 }}
                key={index}
                className='cardboard'

              >
                <img width={150} src={item.imgPath} alt="" />
                <div style={{ width: "200px" }} className="box">
                  <h1 className="title">{item.projectTitle}</h1>
                  <p className="sub-title">{item.subTitle}</p>
                  <div className="flex icons">
                    <div style={{ gap: "11px" }} className='flex'>
                      {item.demoLink &&
                        <a className="icon-link" href={item.demoLink} target='_blank' rel='noopener noreferrer' />}
                      <a className="icon-github" href={item.projectLink} target='_blank' rel='noopener noreferrer' />
                    </div>
                  </div>
                </div>
              </motion.article>
            )

          }
          )}

        </AnimatePresence>

      </section>
    </main>
  )
}
