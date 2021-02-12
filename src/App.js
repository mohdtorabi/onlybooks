import { Domain } from '@material-ui/icons';
import './App.scss';
import NewClub from './components/NewClub';
import NewUser from './components/NewUser';
import SearchBook from './components/Search/SearchBook';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div>
      {/* <NewClub></NewClub> */}
      
      <NewUser></NewUser>
      <SearchBook></SearchBook>
    </div>
    </Router>
  );
}

export default App;
