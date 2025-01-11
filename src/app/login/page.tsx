"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const goToSignUp = () => {
    router.push("/signup");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    let token;

    try {
      await fetch(`https://instabackend-erkq.onrender.com/login `, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => {
          console.error("Error:", error);
        })
        .then((response) => {
          if(response == 'Password invalid') {
            return
          }else if(response.message == 'User not found'){
            return
          }else{
          token = response;
          console.log(token);
          localStorage.setItem("authorization", "Bearer " + token);
          router.push("/posts");
          }

        });
    } catch (err) {
      console.log(err);
    }

    setError(null);

    console.log("Form submitted", { email, password });
  };
  const goToPosts = () => {
    router.push("/posts");
  };
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <Card className="flex flex-col justify-center items-center max-w-[390px] w-full bg-black gap-4 border-none">
        <div className="flex justify-center items-center mb-8">
          <p className="text-white text-3xl font-bold tracking-tight text-center font-[Billabong, sans-serif]">
            Instagram
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full gap-4"
        >
          <Input
            type="text"
            placeholder="Mobile number, username or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#121212] w-[260px] h-[36px] font-medium text-white"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#121212] w-[260px] h-[36px] text-white"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
          <Button
            onClick={goToPosts}
            type="submit"
            className="w-[270px] h-[32px] bg-blue-500"
          >
            Log in
          </Button>
        </form>

        <div className="text-white justify-center mt-4">
          <span>Don't have an account? </span>
          <button onClick={goToSignUp} className="text-[#0095F6] ">
            Sign up
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Page;
