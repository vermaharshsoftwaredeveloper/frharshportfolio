// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

function Home() {
  return (
    <main className="main-content">
      <Hero />
      <div className="content-wrapper">
        <About />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}

export default Home;
