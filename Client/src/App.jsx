import Login from "./Login"
import Signup from "./Signup"
import Home from "./Home"
import { BrowserRouter, Routes, Route } from "react-router";
import VideoCallSetup from "./VideoCallSetup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/video-call/setup/:id" element={<VideoCallSetup/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
