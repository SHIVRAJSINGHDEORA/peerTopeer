import { Button } from "./components/ui/button";
import { Field } from "./components/ui/field";
import { Input } from "./components/ui/input";
import logo from "./assets/logo.svg";

export default function Navbar({ isLoggedIn,handleLogout }) {
  return (
    <>
      <div className="fixed top-0 z-50 flex w-full items-center gap-8 bg-background p-5 shadow-md shadow-primary/30">
        <div className="w-full">
          <img className="w-50 h-auto" src={logo} alt="logo" />
        </div>
        <div className=" flex gap-8 ">
          <Button variant="ghost" size="lg">
            Home
          </Button>
          <Button variant="ghost" size="lg">
            Pricing
          </Button>
          <Button variant="ghost" size="lg">
            About
          </Button>
          <Button variant="ghost" size="lg">
            Support
          </Button>
        </div>
        <div className="w-full">
          <Field orientation="horizontal">
            <Input type="search" placeholder="Search..." />
            <Button>Search</Button>
          </Field>
        </div>
        <div className="ml-auto flex gap-4">
          {!isLoggedIn ? (
            <>
              <Button
                className={
                  "bg-[#e6f0ff] font-bold text-blue-800 px-5  text-sm hover:bg-[#e6f0ff]/60"
                }
                size="lg"
              >
                Sign Up Free
              </Button>
              <Button
                className={
                  "bg-[#0b5cff] font-bold text-white px-5  text-sm hover:bg-[#0b5cff]/60"
                }
                size="lg"
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
