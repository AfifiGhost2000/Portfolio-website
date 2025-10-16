import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './header.css'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"


export default function Header() {
    const [showModal, setshowModal] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("currentMode") ?? "dark");

    const location = useLocation();

    useEffect(() => {

        if (theme === "light") {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
        }



    }, [theme])

    const links = document.querySelectorAll('header ul li a');
    let previouslyClickedLink = null;

    links.forEach((link) => {
    link.addEventListener('click', () => {
        if(previouslyClickedLink) previouslyClickedLink.classList.remove('clicked');
        link.classList.add('clicked');
        previouslyClickedLink = link;
    });
    });

    if(location.pathname === '/' & previouslyClickedLink != null) previouslyClickedLink.classList.remove('clicked');
    
    return (
        <header className='flex'>

            <button onClick={() => setshowModal(true)} className="menu icon-menu flex" />

            {location.pathname !== '/' && (

                <Link to='/'>

                    <div className='parent-avatar flex'>
                        <img
                        
                            src="/me.png" className='avatar' alt="" />
                    </div>

                </Link>


            )}



            <div />
            <nav>
                <ul className='flex'>
                  <li><Link to="/about">About</Link></li>
                    <li><Link to="/articles">Articles</Link></li>
                    <li><Link to="/projects">Projects</Link></li>
                    <li><a href="">More</a></li>
                </ul>

            </nav>

            <button onClick={() => {
                //sent value to local storage
                localStorage.setItem("currentMode", theme === "dark" ? "light" : "dark")
                // get value from local storage
                setTheme(localStorage.getItem("currentMode"))

            }} className='mode flex'>
                {theme === "dark" ? <span className='icon-moon-o' /> : <span className='icon-sun' />}
            </button>


            {/* Mobile View Modal*/}

            {showModal && (

                <div className='fixed'>

                    <ul className='modal'>
                        <li>
                            <button className='icon-close' onClick={() => { setshowModal(false) }} />

                        </li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><a href="">Articles</a></li>
                        <li><Link to="/projects">Projects</Link></li>
                        <li><a href="">Speaking</a></li>
                        <li><a href="">Uses</a></li>
                    </ul>

                </div>
            )
            }
        </header>

    )
}
