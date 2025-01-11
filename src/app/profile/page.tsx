"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  House,
  Compass,
  Clapperboard,
  SquarePlus,
  MessageCircleMore,
  Grid3x3,
  Bookmark,
  SquareUser,
  ChevronDown,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { AlignJustify } from "lucide-react";

type containType = {
  _id: string;
  username: string;
};
type containPost = {
  _id: string;
  caption: string;
  postImg: string;
};

type followerType = {
  [key: number]: containType;
};

type userType = {
  username: string;
  profileImg: string;
  followers: followerType[];
  following: followerType[];
  posts: containPost[];
};

type jwtType = {
  username: string;
  userId: string;
};

const Page = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<userType>({
    username: "",
    profileImg: "",
    followers: [],
    following: [],
    posts: [],
  });
  const [posts, setPosts] = useState([]);
  const fetchToken = localStorage.getItem("authorization");

  const decoded: jwtType = jwtDecode<jwtType>(fetchToken || "");
  console.log(decoded);

  const getProfile = async () => {
    try {
      const response = await fetch(
        "https://instabackend-erkq.onrender.com/user/posts",
        {
          method: "POST",
          body: JSON.stringify({ userId: `${decoded.userId}` }),
          headers: {
            authorization: `${fetchToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const user = data.find((item: any) => item._id === decoded.userId);
      setProfile(user);
      setPosts(data.posts);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  console.log(profile);

  const navigateTo = ({ path }: { path: string }) => {
    router.push(path);
  };

  return (
    <div className="bg-white text-black font-sans">
      {" "}
      <div className="fixed top-0 h-7 w-[100vw] bg-whitetext-zinc-950 font-semibold flex justify-between  border-slate-500 m bottom-0 left-0  grid-cols-1 px-8 bg-white border-b-gray-400">
        {" "}
        <div className=" flex justify-between h-[10px] w-[100vw]  ">
          {" "}
          <div>
            <Settings />{" "}
          </div>{" "}
          <div className="flex justify-center">
            <div>{profile.username}</div>
            <ChevronDown />{" "}
          </div>{" "}
          <div className="flex justify-center">
            <SquarePlus />
            <AlignJustify />{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="p-4">
        {" "}
        <div className="flex">
          {" "}
          <div>
            <img
              src={
                profile.profileImg ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"
              }
              className="rounded-full w-[77px] h-[77px] m-5"
            />
          </div>{" "}
          <div>
            <div className="m-6 font-semibold">{profile.username}</div>{" "}
            <div className="mt-6 flex justify-center space-x-4">
              <button className="bg-stone-300 m-2 rounded-sm w-[114px] h-[32px] font-semibold ">
                Edit Profile
              </button>
              <button className="bg-stone-300 m-2 rounded-sm w-[114px] h-[32px] font-semibold ">
                View Archive
              </button>
            </div>
          </div>
        </div>
        <div className="flex space-x-10 justify-center  text-zinc-950 font-semibold  border-slate-500 m top-0 left-0 w-full grid-cols-1 px-8 bg-white border-t border-black-500 white:bg-gray-700 white:border-gray-600x">
          <div className="text-center">
            <div className="font-bold text-xl">{profile?.posts.length}</div>
            <div className="text-gray-500">posts</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-xl">{profile?.followers.length}</div>
            <div className="text-gray-500">followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-xl">{profile?.following.length}</div>
            <div className="text-gray-500">following</div>
          </div>
        </div>
        <div className="mt-4"></div>
      </div>
      <div className=" border-slate-500 bottom-0  grid-cols-1 px-8 bg-white border-b-gray-400"></div>
      <div className="p-4 grid grid-cols-3 gap-4">
        {posts?.map((post, index) => (
          <div key={index} className="relative">
            {/* <img
              className="w-full h-full object-cover rounded-lg"
              src={post.profileImg || "default-image.jpg"}
              alt="Post"
            /> */}
          </div>
        ))}
      </div>
      <div>
        <img 
          src=" https://i.pinimg.com/736x/3b/cc/e6/3bcce60bad0c1d486e88cb0c85c494e0.jpg"
          className="w-[140px] h-[140px]"
        />
      </div>
      {/* <div><img src={profile.post || "https://i.pinimg.com/736x/3b/cc/e6/3bcce60bad0c1d486e88cb0c85c494e0.jpg}/></div> */}
      <div className="fixed bottom-0 left-0 grid w-full h-12 grid-cols-1 px-8 bg-white border-t border-black-500  white:bg-gray-700 white:border-gray-600 ">
        <div className="flex justify-between p-4  ">
          <House onClick={() => router.push("posts")} />
          <Compass />
          <Clapperboard />
          <SquarePlus />
          <MessageCircleMore />
          <img
            className="h-[25px] w-[25px]  rounded-full"
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDxUPDw8VFRUVFRUVFRUVFRUVFRUPFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDi0ZFRkrKys3NysrKystNystNystKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQcC/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDERFBAAFQAAAAAKKCKgiqIoCKioKgCgIqoAKVFABAAFQCACoAgAAAAKCAAAAAIKAKEBQKCCUVBFEAUAUAAA1QARAFURQQRFRQABUwUAEFUBBDFRRQEAAAAAABFQRRBRQEAAABVKCoAiggCogoggCigIqKigIqAAAKgCgAKgCoAIKioAIAACoqgAgBqioAAACKIqAAqoCAAAKgAAKIoAAAAFRQEAUBREAARQUNVFRUDQAAAAEAAVAAAAAAAAAQVAVQAAAAAAAAAAAAAAAAAAAEUUQVEFQAAAAAABAAANBVAACACKUEVAFVFBBQHKiKigIoAAACCgIAIACgAgAAAAACiAqgAAAAAAAoiggCgAAqQQAFABBBUAAEAAEUUAEABQABQEUAAwAAADAAFRVBFRAVFBAKAAoIqIACoAAAIAAAAAACoCqigAAEAAVFBFQUUEQAAAAEUBAFQAAAAAAARQAAVFABEURRQABUUEUAQBQAAAAARBAUAAAAAEABRUBAUBQAAAAAQBRQABUAAFEAAAEKkUBIVQEUARQBAAWAIoAIEAUgCi1AQFgAigBRQCAKP/9k="
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
