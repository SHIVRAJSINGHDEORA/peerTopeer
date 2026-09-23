import { useState } from "react";
import { LoginForm } from "./components/login-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "sonner"
import { showToast } from "./components/customToast";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = inputValue;
  const navigate = useNavigate();
  const {setIsAuthenticated} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      handleError("All feilds are required!");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8080/login",
        { ...inputValue },
        {
          withCredentials: true,
        },
      );

      console.log(data);
      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setIsAuthenticated(true);
        setTimeout(() => {
          toast.dismiss();
          
          navigate("/home");
        }, 3000);
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
    showToast(msg, "success", "top-right");
  };

  const handleError = (err) => {
    showToast(err, "error", "top-right");
  };

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[url('./assets/background1.jpg')]">
       
        <div className="w-full max-w-sm">
          <LoginForm
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}
