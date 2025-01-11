// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";

// const Page = () => {
//   const router = useRouter();

//   const goTo = () => {
//     router.push("/login");
//   };

//       return (
//     <div className="flex justify-center items-center h-screen bg-black">
//       <Card className="flex flex-col justify-center items-center w-[390px] bg-black gap-4 border-none">
//         <div className="flex justify-center items-center mb-8">
//           <p
//             className="text-white text-3xl font-bold tracking-tight text-center
//             font-[Billabong, sans-serif]"
//           >
//             Instagram
//           </p>
//         </div>
//         <h2 className="text-[#A8A8A8] w-[260px] justify-center">
//           sign up to see photos and videos from your friends
//         </h2>
//         <Input
//           placeholder="Mobile number or email"
//           className="bg-[#121212] w-[260px] h-[36px] font-medium  text-white"
//         />
//         <Input
//           placeholder="Password"
//           className="bg-[#121212] w-[260px] h-[36px] text-white"
//         />
//         <Input
//           placeholder="Full name"
//           className="bg-[#121212] w-[260px] h-[36px] text-white"
//         />
//         <Input
//           placeholder="Username"
//           className="bg-[#121212] w-[260px] h-[36px]  text-white"
//         />
//         <Button className="w-[270px] h-[32px] bg-blue-500">sign up</Button>
//       </Card>

//       <div className="text-white justify-center">
//         dont have an account?
//         <button onClick={goTo} className="text-[#0095F6]">
//           log in
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Page;

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
      fullName: "",
      username: "",
    };

    if (!email) {
      newErrors.email = "This field is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "This field is required.";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (!fullName) {
      newErrors.fullName = "This field is required.";
      isValid = false;
    }
    if (!username) {
      newErrors.username = "This field is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setEmail("");
      setPassword("");
      setFullName("");
      setUsername("");

      router.push("/posts");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <Card className="flex flex-col justify-center items-center w-[390px] bg-black gap-4 border-none">
        <div className="flex justify-center items-center mb-8">
          <p className="text-white text-3xl font-bold tracking-tight text-center font-[Billabong, sans-serif]">
            Instagram
          </p>
        </div>
        <h2 className="text-[#A8A8A8] w-[260px] text-center">
          Sign up to see photos and videos from your friends
        </h2>

        <form className="w-[260px] space-y-4" onSubmit={handleSubmit}>
          <div>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Mobile number or email"
              className={`bg-[#121212] h-[36px] font-medium text-white ${
                errors.email ? "border-2 border-red-500" : "border-none"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className={`bg-[#121212] h-[36px] text-white ${
                errors.password ? "border-2 border-red-500" : "border-none"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              className={`bg-[#121212] h-[36px] text-white ${
                errors.fullName ? "border-2 border-red-500" : "border-none"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className={`bg-[#121212] h-[36px] text-white ${
                errors.username ? "border-2 border-red-500" : "border-none"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <Button type="submit" className="w-[270px] h-[32px] bg-blue-500">
            sign up
          </Button>
        </form>
      </Card>

      <div className="text-white mt-4">
        Don’t have an account?{" "}
        <button
          onClick={() => router.push("/login")}
          className="text-[#0095F6]"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Page;
