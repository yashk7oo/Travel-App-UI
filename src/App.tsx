import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TravelScreen from './components/TravelScreen';
import OtherScreen from './components/OtherScreen';

const App: React.FC = () => {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Find Places for City</Link>
              </li>
              <li>
                <Link to="/other">Manage Existing Details</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" Component={TravelScreen} />
            <Route path="/other" Component={OtherScreen} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
