import axios from "axios";
import { SignupForm } from "./components/signup-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { showToast } from "./components/customToast";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";


export default function Signup() {
  const [inputValue, setInputValue] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { email, password, username } = inputValue;
  const {setIsAuthenticated} = useAuth();
  const API_URL = import.meta.env.VITE_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      handleError("All feilds are required!");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/signup`,
        { ...inputValue },
        { withCredentials: true },
      );

      console.log(data);
      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setIsAuthenticated(true);
        setTimeout(() => {
          toast.dismiss();
          navigate("/home");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err.message);
      handleError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = (msg) => {
    showToast(msg, "success","top-right");
  };

  const handleError = (err) => {
    showToast(err, "error","top-right");
  };

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[url('./assets/background1.jpg')]">
        <div className="w-full max-w-sm">
          <SignupForm
            inputValue={inputValue}
            setInputValue={setInputValue}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}
