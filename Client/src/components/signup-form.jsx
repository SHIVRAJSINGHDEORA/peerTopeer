import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { CircleCheck, CircleX } from "lucide-react";

export function SignupForm({ inputValue, setInputValue,isLoading,handleSubmit, ...props }) {
  const handleInputValue = (e) => {
    const { id, value } = e.target;
    setInputValue({ ...inputValue, [id]: value });
    if(id == 'password' && value.length < 8){
      setConfirmPass("");
      setPassMatch(null);
    }
  };

  const [isValid, setIsValid] = useState(null);
  const [confirmPass, setConfirmPass] = useState("");
  const [passMatch, setPassMatch] = useState(null);
  const { email, username, password } = inputValue;
   const API_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    if (!username) {
      setIsValid(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/check-username`,
          { params: { username } },
          { withCredentials: true },
        );

        setIsValid(data.available);
      } catch (err) {
        console.log(err.message);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  const handleConfirmPass = (e) => {
    setConfirmPass(e.target.value);
    if (e.target.value === password) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className={"text-center "}>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={handleInputValue}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="username"
                  type="username"
                  placeholder="@samayhoonme"
                  required
                  value={username}
                  onChange={handleInputValue}
                />
                <InputGroupAddon align="inline-end">
                  {isValid == true && <CircleCheck color="#11ff00" />}
                  {isValid == false && <CircleX color="#F87171" />}
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                value={[password]}
                onChange={handleInputValue}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                className={`
                  ${passMatch === false && " focus-visible:border-red-400 focus-visible:ring-red-400/50"}
                  ${passMatch === true && " focus-visible:border-green-500 focus-visible:ring-green-500/50"}
                `}
                id="confirm-password"
                type="password"
                disabled={password.length < 8}
                required
                value={confirmPass}
                onChange={handleConfirmPass}
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
