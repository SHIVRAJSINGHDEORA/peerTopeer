import { SignupForm } from "./components/signup-form";
import { useState } from "react";

export default function Signup() {
  const [inputValue, setInputValue] = useState({
    email: "",
    username : "",
    password: "",
  });

  const { email, password, username } = inputValue;
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[url('./assets/background1.jpg')]">
        <div className="w-full max-w-sm">
          <SignupForm inputValue={inputValue} setInputValue={setInputValue}/>
        </div>
      </div>
    </>
  );
}
