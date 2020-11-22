import logo from './logo.svg';
import './App.css';
import Store from '../src/components/Store'
import FetchHandler from './DataHandler/FetchHandler';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path="/store" exact component={Store} />
      <Route path="/" exact component={FetchHandler} />
    </Router>
  );
}

export default App;
