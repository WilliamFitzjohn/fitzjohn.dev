import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>  
          <Route path='/home' element={<Home/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/projects' element={<Projects/>} />
          <Route path='/resume' element={<Resume/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
