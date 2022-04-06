import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";


function App() {
  return (
    <div className="App">
      <Routes>  
        <Route path='/home' element={<Home/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/resume' element={<Resume/>} />
      </Routes>
    </div>
  );
}

export default App;
