"use client";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import data from "@/app/home/data.json";
import AnimeCard from "@/components/card";
import { Navbar } from "@/components/Navbar";
import Carousel from "@/components/carousel";
import Link from "next/link";

export default function Home() {
  const [animedata, setAnimeData] = useState([]);
  const [animetype, setAnimetype] = useState("");
  const [userdata, setUserData] = useState<any>({  });
  const [searchedanime, setSearchedanime] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [loading, setloading] = useState(false);
  const getUserData = async () => {
    try {
      const response = await axios.get("/api/getuserData");
      await setUserData(response.data.data);
      console.log(response.data.data);
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

 

  const getData = (anime: any) => {
    setAnimetype(anime);
  };

  const fetchData = async () => {
    setloading(true);
    console.log('getting user data');
    
    await getUserData();
    console.log(userdata);
    
    try{
      const response:any = await axios.post("/api/getanime",{
       
          animetype:animetype,
          searchedanime:searchedanime
        
      });
      setloading(false);
      // console.log(response);
      
      setAnimeData(response.data.data);
      console.log(userdata._id);
      
      const responseuser=await axios.post("/api/getlikedandwl",{
        userId:userdata._id
      })
      console.log("user response");
      
      console.log(responseuser);
      
      setUserData(responseuser)
      
      
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
  };

  useEffect(() => {
    console.log("runnning fetch data");
    
    // console.log(animetype,searchedanime);
    
    fetchData();
    // console.log(animedata);
    
  }, [animetype,searchedanime]);

  const handleSearchClick = () => {
    if (searchInputRef.current) {
      setSearchedanime(searchInputRef.current.value);
      console.log(searchedanime);
      
    }
  };

  const animedataarray = animedata?animedata.slice(0, 10):[];

  return (
    <div className="flex flex-col">
      <div>
        { loading ? (
      <div className="h-[40vh] items-center flex-col w-[100vw] justify-center flex"><img className="h-[8rem] w-[12rem]" src="/loading.gif" alt=""/>Loading...</div>
    ) : (<Carousel data={animedataarray} />)}
      </div>
      <Navbar getData={getData} />
      <div className="w-full flex justify-center p-5 items-center">
        <label
          htmlFor="search"
          className="mb-2 text-2xl font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            ref={searchInputRef}
            type="search"
            id="search"
            className="block w-full p-4 ps-10 text-2xl text-gray-900 border border-gray-300 rounded-full bg-black focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
          <button
            onClick={handleSearchClick}
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-thin rounded-full text-2xl px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
      <div className="px-[3vw] text-6xl font-bold text-white">
        Animes - {animetype ? animetype : "All"}
      </div>
      
      <div className="flex flex-wrap justify-center mt-5 gap-6 min-h-[400px]">
      { loading ? (
      <div className="h-[40vh] items-center flex-col w-[100vw] justify-center flex"><img className="h-[8rem] w-[12rem]" src="/loading.gif" alt=""/>Loading...</div>
    ) : (

        animedata.map((anime: any) => (
          <Link key={anime._id} href={`/animeinfo/${anime._id}`}>
            <AnimeCard props={anime}  />
          </Link>
        )))}
      </div>
    </div>
  );
}
