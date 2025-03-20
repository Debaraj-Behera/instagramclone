import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("https://instagramclone-2-jfjk.onrender.com/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    }
  };

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];

  return (
    <>
      {/* Sidebar for Desktop */}
      <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen hidden md:flex flex-col">
        <div className="flex flex-col items-center justify-center my-8 pl-3 font-bold text-xl">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
            alt="logo"
          />
          <span className="text-sm text-gray-400">Made by Mr.Debaraj</span>
        </div>
        <div>
          {sidebarItems.map((item, index) => (
            <div
              onClick={() => sidebarHandler(item.text)}
              key={index}
              className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation (Only Home, Profile, Create, Logout) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 flex justify-around items-center p-3 md:hidden z-20">
        {sidebarItems
          .filter((item) =>
            ["Home", "Profile", "Create", "Logout"].includes(item.text)
          )
          .map((item, index) => (
            <button
              key={index}
              onClick={() => sidebarHandler(item.text)}
              className="flex flex-col items-center text-xs text-gray-600 hover:text-black"
            >
              {item.icon}
              <span>{item.text}</span>
            </button>
          ))}
      </div>

      <CreatePost open={open} setOpen={setOpen} />
    </>
  );
};

export default LeftSidebar;
