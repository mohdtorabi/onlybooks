import { useState } from 'react';
import './App.scss';
// import NewClub from './components/NewClub';
// import NewUser from './components/NewUser';
import SearchBook from './components/Search/SearchBook';

export default function App() {
  const [state, setState] = useState({
    book: '',
  });
  return (
    <div>
      {/* <NewClub></NewClub> */}
      {/* <NewUser></NewUser> */}
      <SearchBook state={state} setState={setState}></SearchBook>
    </div>
  );
}
