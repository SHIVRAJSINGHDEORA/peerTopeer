import { cn } from "@/lib/utils";
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
import { Link } from "react-router";
import { Spinner } from "@/components/ui/spinner"

export function LoginForm({ className, inputValue, setInputValue,handleSubmit,isLoading, ...props }) {
  const { email, password } = inputValue;

  const handleInputValue = (e) => {
    const { id, value } = e.target;
    setInputValue({ ...inputValue, [id]: value });
  };

  

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className={"px-2.5 py-8 border"}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription className={"p-2 mb-0.5"}>
            Enter your email below to login to your account
          </CardDescription>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handleInputValue}
                  required
                />
              </Field>

              <Field>
                <Button disabled={isLoading} type="submit">{isLoading ? <><Spinner className="size-6" data-icon="inline-start"/> Please wait...</> : "Login"}</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
