import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Storage from './components/listingHandler/DisplayHandler';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Storage} />
    </Router>
  );
}

export default App;
