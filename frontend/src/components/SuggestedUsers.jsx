import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function SuggestedUsers() {
  const { suggestedUsers } = useSelector((store) => store.auth);

  return (
    <div className="my-10 hidden md:block"> {/* Hidden on mobile, visible on medium+ screens */}
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium cursor-pointer">See All</span>
      </div>
      {suggestedUsers.map((user) => (
        <div key={user._id} className="flex items-center justify-between my-5">
          <div className="flex items-center gap-2">
            <Link to={`/profile/${user?._id}`}>
              <Avatar>
                <AvatarImage src={user?.profilePicture} alt="user avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h1 className="font-semibold text-sm">
                <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
              </h1>
              <span className="text-gray-600 text-sm">
                {user?.bio || "Bio here ..."}
              </span>
            </div>
          </div>
          <span className="text-[#3BADF8] cursor-pointer text-xs font-bold hover:text-[#a5cde9]">
            Follow
          </span>
        </div>
      ))}
    </div>
  );
}
