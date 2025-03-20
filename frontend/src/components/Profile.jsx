import useGetUserProfile from "@/hooks/UseGetUserProfile";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";

export default function Profile() {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState("posts");

  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="flex justify-center items-start px-4 sm:px-10 lg:px-20 min-h-screen overflow-y-auto">
      <div className="flex flex-col gap-10 w-full max-w-5xl p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <section className="flex items-center justify-center flex-col">
            {/* Profile Picture */}
            <Avatar className="h-36 w-36">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt="profilephoto"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {/* Username below Profile Picture */}
            <span className="text-lg font-semibold mt-4">{userProfile?.username}</span>
          </section>

          <section>
            <div className="flex flex-col gap-4 sm:gap-5">
              <div className="flex items-center gap-2">
                {isLoggedInUserProfile ? (
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <Link to="/account/edit">
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-300 mr-1"
                      >
                        Edit Profile
                      </Button>
                    </Link>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-300 mr-1"
                    >
                      View Archive
                    </Button>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-300 mr-1"
                    >
                      Add Tools
                    </Button>
                  </div>
                ) : isFollowing ? (
                  <>
                    <Button variant="secondary" className="h-8">
                      Unfollow
                    </Button>
                    <Button variant="secondary" className="h-8">
                      Message
                    </Button>
                  </>
                ) : (
                  <Button className=" bg-[#87c4ed] hover:bg-[#50a5de] h-8">
                    Follow
                  </Button>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-5 gap-3 text-sm sm:text-base">
                <p>
                  <span className="font-semibold">
                    {userProfile?.posts.length}
                  </span>{" "}
                  posts
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.followers.length}{" "}
                  </span>
                  followers
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.following.length}{" "}
                  </span>
                  following
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-sm sm:text-base">
                  {userProfile?.bio || "Bio here..."}
                </span>
                <Badge className="w-fit" variant="secondary">
                  <AtSign />
                  <span className="pl-1">{userProfile?.username}</span>
                </Badge>
                <span className="text-sm sm:text-base">Created By Mr. Debaraj</span>
              </div>
            </div>
          </section>
        </div>

        {/* Tab Navigation */}
        <div className="border-t border-t-gray-300 mt-6">
          <div className="flex items-center justify-center gap-10 text-sm sm:text-base">
            <span
              onClick={() => handleTabChange("posts")}
              className={`py-3 cursor-pointer ${
                activeTab === "posts" ? "font-bold" : ""
              }`}
            >
              POSTS
            </span>
            <span
              onClick={() => handleTabChange("saved")}
              className={`py-3 cursor-pointer ${
                activeTab === "saved" ? "font-bold" : ""
              }`}
            >
              SAVED
            </span>
            <span
              onClick={() => handleTabChange("reels")}
              className="py-3 cursor-pointer"
            >
              REELS
            </span>
            <span
              onClick={() => handleTabChange("tags")}
              className="py-3 cursor-pointer"
            >
              TAGS
            </span>
          </div>

          {/* Display Posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {displayPost?.map((post) => (
              <div
                key={post?._id}
                className="relative group cursor-pointer w-full"
              >
                <img
                  src={post.image}
                  alt="post_image"
                  className="rounded-sm my-2 w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-white space-x-4">
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <Heart />
                      <span>{post?.likes.length}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <MessageCircle />
                      <span>{post?.comments.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}




