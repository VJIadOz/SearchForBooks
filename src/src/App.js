import './styles/App.css';
import Header from './components/Header.js';
import MainContent from './components/MainContent.js';
import Loading from './components/Loading';

function App() {

  return (
    <div className="App">
      <Loading/>
      <Header/>
      <MainContent/>
    </div>
  );
}

export default App;
