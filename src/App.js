import './App.scss';
import NewClub from './components/NewClub';
import NewUser from './components/NewUser';
import SearchBook from './components/Search/SearchBook';
function App() {
  return (
    <div>
      <NewClub></NewClub>
      <NewUser></NewUser>
      <SearchBook></SearchBook>
    </div>
  );
}

export default App;
