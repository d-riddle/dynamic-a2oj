import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/topbar/TopBar";
import { Context } from "./context/Context";
import Home from "./pages/home/Home";
import LadderData from "./pages/ladderData/LadderData";
import Ladders from "./pages/ladders/Ladders";
import Login from "./pages/login/Login";

function App(){
    const { user } = useContext(Context);
    return (
        <Router>
        <TopBar />
            <Routes>
                <Route path="/login" element={user?<Home />:<Login />}></Route>
                <Route path="/" element={user?<Home />:<Login />}></Route>
                <Route path="/:value" element={user?<Ladders />:<Login />}></Route>
                <Route path="/:value/:id" element={user?<LadderData />:<Login />}></Route>
            </Routes>
        </Router>
    );
}

export default App;