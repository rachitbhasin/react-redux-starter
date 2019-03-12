import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    <nav className="header-container background-blue">
      <div><Link to='/'>Home</Link></div>
      <div><Link to='/about'>About</Link></div>
    </nav>
  </header>
)

export default Header