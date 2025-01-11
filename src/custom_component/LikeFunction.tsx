"use client";

const LikeFunction = () => {
  const like = async () => {
    try {
      const response = await fetch(
        "https://instabackend-erkq.onrender.com/likes",
        {
          method: "POST",
          body: JSON.stringify({
            // userId: `${decoded.userId}`,
          }),
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzc2M2IyZGVlOWRlNWNlYTVjNGU3MTEiLCJ1c2VybmFtZSI6ImtodWxhbiIsImlhdCI6MTczNTgwMTY0NX0.RZb9wjXcJLijYEyNU5vSN4ut9qYRpcyJfgX5gz9qrWU",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return <div></div>;
};

export default LikeFunction;
