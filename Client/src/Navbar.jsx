import { Button } from "./components/ui/button";
import { Field } from "./components/ui/field";
import { Input } from "./components/ui/input";
import logo from "./assets/logo.svg";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { showToast } from "./components/customToast";
import { Link, useNavigate } from "react-router";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const path = location.pathname.toLowerCase();
  const { setIsAuthenticated } = useAuth();

  const hideNavbar =
    path === "/login" || path === "/signup" || path.startsWith("/video-call");

  if (hideNavbar) {
    return null;
  }

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/logout",
        {},
        { withCredentials: true },
      );

      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setIsAuthenticated(true);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err.message);
      handleError(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleSuccess = (msg) => {
    showToast(msg, "success", "top-right");
  };

  const handleError = (err) => {
    showToast(err, "error", "bottom-right");
  };

  const handleHome = () => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  const handleNav = (e) => {
    navigate(`/${e.target.id}`);
  };

  return (
    <>
      <div className="fixed top-0 z-50 flex w-full items-center gap-8 bg-background p-5 shadow-md shadow-primary/30">
        <div className="w-full">
          <Link to="/">
            <img className="w-50 h-auto" src={logo} alt="logo" />
          </Link>
        </div>
        <div className=" flex gap-8 ">
          <Button variant="ghost" size="lg" onClick={handleHome}>
            Home
          </Button>
          <Button id="pricing" variant="ghost" size="lg" onClick={handleNav}>
            Pricing
          </Button>
          <Button id="about" variant="ghost" size="lg" onClick={handleNav}>
            About
          </Button>
          <Button id="support" variant="ghost" size="lg" onClick={handleNav}>
            Support
          </Button>
        </div>
        <div className="w-full flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="text-sm font-semibold text-white">
              System Status
            </span>
          </div>
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            All Operational
          </span>
        </div>
        <div className="ml-auto flex gap-4">
          {!isAuthenticated ? (
            <>
              <Button
                className={
                  "bg-[#e6f0ff] font-bold text-blue-800 px-5  text-sm hover:bg-[#e6f0ff]/60"
                }
                size="lg"
                onClick={() => navigate("/signup")}
              >
                Sign Up Free
              </Button>
              <Button
                className={
                  "bg-[#0b5cff] font-bold text-white px-5  text-sm hover:bg-[#0b5cff]/60"
                }
                size="lg"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </>
          ) : (
            <Button size="lg" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
