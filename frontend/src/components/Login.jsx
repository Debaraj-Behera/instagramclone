import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://instagramclone-2-jfjk.onrender.com/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
        setInput({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(user) {
      navigate("/");
    }
  },[])
  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={submitHandler}
        className="shadow-lg flex flex-col gap-5 p-8"
      >
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className="text-sm text-center">
            Login to see photos & videos from your friends
          </p>
        </div>
        <div>
          <Label htmlFor="email" className="font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <Label htmlFor="password" className="font-medium">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        {isLoading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button>Login</Button>
        )}
        <span className="text-center">
          Create an Account ?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
}
