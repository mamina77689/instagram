"use client";

import { useEffect, useState } from "react";
import { Heart, Router } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Send } from "lucide-react";
import { Bookmark } from "lucide-react";
import { House } from "lucide-react";
import { Compass } from "lucide-react";
import { Clapperboard } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { PostActions } from "@/custom_component/PostActions";

export type likeTypes = {
  profileImage: string;
  username: string;
  _id: string;
};

type Post = {
  caption: string;
  _id: string;
  postImg: string;
  userId: {
    _id: string;
    username: string;
    profileImg: string;
  };
  likes: string[];
  comments: string[];
};

const Page = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  const decoded = jwtDecode(
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzc2M2IyZGVlOWRlNWNlYTVjNGU3MTEiLCJ1c2VybmFtZSI6ImtodWxhbiIsImlhdCI6MTczNTgwMTY0NX0.RZb9wjXcJLijYEyNU5vSN4ut9qYRpcyJfgX5gz9qrWU"
  );

  console.log(decoded);

  const getPosts = async () => {
    try {
      const response = await fetch(
        "https://instabackend-erkq.onrender.com/posts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzc2M2IyZGVlOWRlNWNlYTVjNGU3MTEiLCJ1c2VybmFtZSI6ImtodWxhbiIsImlhdCI6MTczNTgwMTY0NX0.RZb9wjXcJLijYEyNU5vSN4ut9qYRpcyJfgX5gz9qrWU",
          },
        }
      );

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  console.log(posts);
  // const PostActions = ({
  //   postId,
  //   userId,
  //   likes,
  // }: {
  //   postId: string;
  //   userId: { username: string; profileImg: string; _id: string };
  //   likes: likeTypes[];
  // }) => {
  //   const token = localStorage.getItem("accessToken");
  //   const decodedToken = jwtDecode(token ?? "");
  //   const [isLiked, setIsLiked] = useState(false);
  //   useEffect(() => {
  //     const checkLikeStatus = async () => {
  //       try {
  //         const response = await fetch(
  //           `https://instabackend-erkq.onrender.com`,
  //           {
  //             method: "POST",
  //             body: JSON.stringify({
  //               postId,
  //               userId: userId._id,
  //             }),
  //             headers: {
  //               Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );

  //         if (response.ok) {
  //           const data = await response.json();
  //           setIsLiked(data.isLiked);
  //         }
  //       } catch (error) {
  //         console.log("Error ", error);
  //       }
  //     };

  //     checkLikeStatus();
  //   }, [postId, userId]);
  //   console.log(decodedToken);
  //   const handleLike = async () => {
  //     try {
  //       const method = isLiked ? "DELETE" : "POST";
  //       const url = `https://instabackend-erkq.onrender.com/post/like`;

  //       const response = await fetch(url, {
  //         method: method,
  //         body: JSON.stringify({
  //           postId,
  //           userId: "",
  //         }),
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (response.ok) {
  //         setIsLiked((prev) => !prev);
  //       } else {
  //         console.log("errr");
  //       }
  //     } catch (error) {
  //       console.log("Error:", error);
  //     }
  //   };

  return (
    <div className="bg-white mb-16">
      <div>
        {" "}
        <img
          className="w-[150px] h-[80px]"
          src="https://logos-world.net/wp-content/uploads/2020/05/Instagram-Logo-2016-present.png"
        />
      </div>
      <div>
        <div className="text-black flex flex-col ">
          {posts.map((post) => {
            return (
              <div key={post._id}>
                <div className="flex justify-start items-center m-3">
                  <img
                    className="h-[25px] w-[25px]  rounded-full"
                    src={post.userId.profileImg}
                    alt=""
                  />{" "}
                  <div className="font-bold m-2">{post.userId.username}</div>
                </div>

                <div className="flex items-center justify-center">
                  {" "}
                  <img
                    className="h-[430px] w-[430px]"
                    src={post.postImg}
                    alt=""
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex justify-start m-3 gap-2">
                    {" "}
                    {/* <button onClick={handleLike}>
                        <Heart color={isLiked ? "red" : "white"} />
                      </button> */}
                    <Heart />
                    <div></div>
                    <div>{post.likes}</div>
                    <MessageCircle />
                    <div>{post.comments}</div>
                    <Send />
                  </div>
                  <div className="flex justify-end m-3 gap-2">
                    <Bookmark />
                  </div>
                </div>
                <div className="flex justify-start m-2 gap-2">
                  <div className="font-bold">{post.userId.username}</div>
                  <div>{post.caption}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 grid w-full h-14 grid-cols-1 px-8 bg-white border-t border-black-500  white:bg-gray-700 white:border-gray-600">
        <div className="flex justify-between p-4  ">
          <House />
          <Compass />
          <Clapperboard />
          <SquarePlus />
          <MessageCircleMore />
          <img
            onClick={() => router.push("profile")}
            className="h-[25px] w-[25px]  rounded-full"
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDxUPDw8VFRUVFRUVFRUVFRUVFRUPFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDi0ZFRkrKys3NysrKystNystNystKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQcC/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDERFBAAFQAAAAAKKCKgiqIoCKioKgCgIqoAKVFABAAFQCACoAgAAAAKCAAAAAIKAKEBQKCCUVBFEAUAUAAA1QARAFURQQRFRQABUwUAEFUBBDFRRQEAAAAAABFQRRBRQEAAABVKCoAiggCogoggCigIqKigIqAAAKgCgAKgCoAIKioAIAACoqgAgBqioAAACKIqAAqoCAAAKgAAKIoAAAAFRQEAUBREAARQUNVFRUDQAAAAEAAVAAAAAAAAAQVAVQAAAAAAAAAAAAAAAAAAAEUUQVEFQAAAAAABAAANBVAACACKUEVAFVFBBQHKiKigIoAAACCgIAIACgAgAAAAACiAqgAAAAAAAoiggCgAAqQQAFABBBUAAEAAEUUAEABQABQEUAAwAAADAAFRVBFRAVFBAKAAoIqIACoAAAIAAAAAACoCqigAAEAAVFBFQUUEQAAAAEUBAFQAAAAAAARQAAVFABEURRQABUUEUAQBQAAAAARBAUAAAAAEABRUBAUBQAAAAAQBRQABUAAFEAAAEKkUBIVQEUARQBAAWAIoAIEAUgCi1AQFgAigBRQCAKP/9k="
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
// };
export default Page;
