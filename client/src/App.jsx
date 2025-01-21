import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Create from "./Components/Create";
import Update from "./Components/Update";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserDetails from "./Components/UsetDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/users/create" element={<Create />}></Route>
        <Route path="/users/update/:userid" element={<Update />}></Route>
        <Route path="/users/detail/:userid" element={<UserDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
