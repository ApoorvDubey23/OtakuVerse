"use client";
import axios from "axios";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

export default function ThreeDCardDemo() {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [newUser, setnewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setnewUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    setloading(true);
    const { username, email, password } = newUser;

    if (username.length === 0 || email.length === 0 || password.length === 0) {
      toast.error("All Fields Required!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      try {
        const response = await axios.post("/api/signup", newUser);

        if (response.data.success) {
          toast.success("User Created Successfully,Please Login");
          // router.push("/verifyemail");
          // added mailing service in the project
          router.push("/login");

        }
      } catch (error: any) {
        if (error.response.status === 400) {
          toast.error(`User Already exists`);
          router.push("/login");
        } else {
          toast.error(`${error.response.data.message}`);
        }
      }
    }
    setloading(false);
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <video
        className="absolute top-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
      >
        {/* Reference the video file from the public directory */}
        <source src="/signupvdo.mp4" />
      </video>
      <Toaster />
      <CardContainer className="inter-var w-[60vw] md:w-[90vh] bg-white bg-opacity-[-0.5] hover:bg-opacity-[0.25] border-[1px] border-white py-[3vh] px-[5vw] rounded-xl">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem
            translateZ="50"
            className="text-6xl font-bold text-neutral-600 dark:text-white"
          >
            SignUp
          </CardItem>
          {loading && <div>Please Wait...</div>}
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-2xl w-full mt-2 dark:text-neutral-300"
          >
            Fill the Information in the following Form
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="text"
                placeholder="example@gmail.com"
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                onChange={handleChange}
              />
              <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
          </CardItem>
          <div className="flex justify-between gap-2 flex-wrap items-center mt-8">
            <Link href="/login">
              <button className="px-6 hover:shadow-md shadow-white py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xl font-bold ">
                Already SignedUp?
              </button>
            </Link>
            <button
              className="px-6 hover:shadow-md shadow-white py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xl font-bold"
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
