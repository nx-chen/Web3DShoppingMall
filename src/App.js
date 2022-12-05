import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ShoppingMall from './ShoppingMall/ShoppingMall';
import ViewerPage from './ShoppingMall/ViewerPage';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<ShoppingMall />}/>
          <Route path='/products' element={<ViewerPage />}/>
        </Routes>
      </Router>      
    </div>
  );
}

export default App;
