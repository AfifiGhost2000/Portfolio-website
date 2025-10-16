import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

export default function Footer() {
  return (

    <footer className='flex'>
      <ul className='flex'>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/articles">Articles</Link></li>
        <li><Link to="/projects">Projects</Link></li>
      </ul>

      <p></p>
    </footer>

  )
}
