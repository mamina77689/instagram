"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const goTo = () => {
    router.push("/login");
  };
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <Card className="flex flex-col justify-center items-center w-[390px] bg-black gap-4 border-none">
        <div className="flex justify-center items-center mb-8">
          <p
            className="text-white text-3xl font-bold tracking-tight text-center 
            font-[Billabong, sans-serif]"
          >
            Instagram
          </p>
        </div>
        <h2 className="text-[#A8A8A8] w-[260px] justify-center">
          sign up to see photos and videos from your friends
        </h2>
        <Input
          placeholder="Mobile number or email"
          className="bg-[#121212] w-[260px] h-[36px] font-medium"
        />
        <Input
          placeholder="Password"
          className="bg-[#121212] w-[260px] h-[36px]"
        />
        <Input
          placeholder="Full name"
          className="bg-[#121212] w-[260px] h-[36px]"
        />
        <Input
          placeholder="Username"
          className="bg-[#121212] w-[260px] h-[36px]"
        />
        <Button className="w-[270px] h-[32px] bg-blue-500">sign up</Button>
      </Card>

      <div className="text-white justify-center">
        dont have an account?
        <button onClick={goTo} className="text-[#0095F6]">
          log in
        </button>
      </div>
    </div>
  );
};
export default Page;
