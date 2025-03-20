import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Comment({ comment }) {
  return (
    <div className="my-2">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src={comment?.author?.profilePicture}
            alt={comment?.author?.username}
          />
          <AvatarFallback>
            {comment?.author?.username?.slice(0, 2).toUpperCase() || "CN"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-bold text-sm">{comment?.author?.username}</h1>
          <p className="text-sm text-gray-700">{comment?.text}</p>
        </div>
      </div>
    </div>
  );
}
