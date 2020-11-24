import logo from './logo.svg';
import './App.css';
import FetchHandler from './components/FetchHandler';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path="/" exact component={FetchHandler} />
    </Router>
  );
}

export default App;
