import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Navigation from './Navigation';
import Todolist from './Todolist/Todolist';


const App = () => {
  return (
    <Router>
      <div>
        <Navigation /> {/* Inclure la navigation */}
        <Routes> 

          {/* Routes principales */}
          <Route path="/todolist" element={<Todolist />} /> 
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;
