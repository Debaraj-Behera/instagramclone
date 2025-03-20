import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";
import { toast } from "sonner";

export default function CommentDialog({ open, setOpen }) {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector((store) => store.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  // const sendMessageHandler = async () => {
  //   alert(text);
  //   setText("");
  // };

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${selectedPost?._id}/comment`,
        { text },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id
            ? { ...p, comments: updatedCommentData }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-5xl p-0 flex flex-col"
        onInteractOutside={() => setOpen(false)}
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              className="rounded-l-lg h-[40vh] w-full object-cover"
              src={selectedPost?.image}
              alt="post_img"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Link>
                  <Avatar>
                    <AvatarImage
                      src={selectedPost?.author?.profilePicture}
                      alt="user avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-xs">
                    {selectedPost?.author?.username}
                  </Link>
                  {/* <span className="text-gray-600 text-sm">Bio here ...</span> */}
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                    Unfollow
                  </div>
                  <div className="cursor-pointer w-full">Add to favorites</div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className="flex-1 overflow-y-scroll max-h-96 p-4">
              {comment.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
              comments here ...
            </div>
            <div className="flex items-center gap-2 py-2 px-4">
              <input
                className="w-full outline-none border rounded-sm border-gray-300"
                type="text"
                value={text}
                onChange={changeEventHandler}
                placeholder="Add a comment ..."
              />
              <button
                disabled={!text.trim()}
                onClick={sendMessageHandler}
                className="border rounded-sm px-2 text-black"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
