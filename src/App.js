import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Account from "./pages/account";

function App() {
  return (
    <>
    
      <BrowserRouter>
      
        <Routes>

          <Route path="/" element={<Home/>}></Route>

          <Route path="/signup" element={<Signup/>}></Route>

          <Route path="/signin" element={<Login/>}></Route>

          <Route path="/account" element={<Account/>}></Route>

        </Routes>
      
      </BrowserRouter>
    
    </>
  );
}

export default App;
