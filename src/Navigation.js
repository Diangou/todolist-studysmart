// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        
        <li>
          <Link to="/todolist">To-Do List</Link>
        </li>
      
      </ul>
    </nav>
  );
};

export default Navigation;
