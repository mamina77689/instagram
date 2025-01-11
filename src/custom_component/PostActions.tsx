import { MessageCircle, Send, Bookmark, Heart } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { likeTypes } from "@/app/posts/page";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

export const PostActions = ({
  postId,
  userId,
  likes,
}: {
  postId: string;
  userId: { username: string; profileImg: string; _id: string };
  likes: likeTypes[];
}) => {
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token ?? "");
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const response = await fetch(`https://instabackend-erkq.onrender.com`, {
          method: "POST",
          body: JSON.stringify({
            postId,
            userId: userId._id,
          }),
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsLiked(data.isLiked);
        }
      } catch (error) {
        console.log("Error ", error);
      }
    };

    checkLikeStatus();
  }, [postId, userId]);
  console.log(decodedToken);
  const handleLike = async () => {
    try {
      const method = isLiked ? "DELETE" : "POST";
      const url = `https://instabackend-erkq.onrender.com/post/like`;

      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({
          postId,
          userId: "",
        }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsLiked((prev) => !prev);
      } else {
        console.log("errr");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex justify-between mt-2 mb-2">
      <div className="flex gap-x-2 ml-2">
        <button onClick={handleLike}>
          <Heart color={isLiked ? "red" : "white"} />
        </button>
        <Link href={`comments/${postId}`}>
          <MessageCircle />
        </Link>
        <Send />
      </div>
      <div className="mr-2">
        <Bookmark />
      </div>
    </div>
  );
};
