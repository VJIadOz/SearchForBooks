import './styles/App.css';
import Header from './components/Header.js';
import MainContent from './components/MainContent.js';
import Loading from './components/Loading';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import InfoBook from "./components/infoBook.js"

function App() {

  return (
    <BrowserRouter>
      <div className="App">
          <Loading/>
          <Header/>
          <Switch>
            <Route exact path='/'/>
            <Route exact path='/books' component={MainContent}/>
            <Route exact path='/books/:id' component={InfoBook}/>
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
