import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router";
import VideoCallSetup from "./VideoCallSetup";
import { Toaster } from "sonner";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";
import { MediaProvider } from "./MediaContext";
import Navbar from "./Navbar";
import { VideoCallLayout } from "./VideoCallLayout";
import VideoCallRoom from "./VideoCallRoom";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route element={<VideoCallLayout />}>
                <Route
                  path="/video-call/setup/:id"
                  element={<VideoCallSetup />}
                />
                <Route
                  path="/video-call/room/:id"
                  element={<VideoCallRoom />}
                />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
