import { useState } from 'react';
import './App.scss';
import NewClub from './components/NewClub';
import NewUser from './components/NewUser';
import Login from './components/Login';
import SearchBook from './components/Search/SearchBook';

export default function App() {
  const [state, setState] = useState({
    book: '',
  });
  return (
    <Router>
    <div>
      {/* <NewClub></NewClub> */}
      <Login></Login>
      <NewUser></NewUser>
      <SearchBook></SearchBook>
    </div>
    </Router>
  );
}
