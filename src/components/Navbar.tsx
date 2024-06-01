"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import { HoverBorderGradientDemo } from "@/components/genretypecard";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
interface NavbarProps {
  className?: string;
  getData: (anime: string) => void;
}

export function Navbar({ className, getData }: NavbarProps) {
  const router=useRouter();
  const animetypes: string[] = [
    "All",
    "Award Winning",
    "Action",
    "Suspense",
    "Horror",
    "Ecchi",
    "Avant Garde",
    "Sports",
    "Supernatural",
    "Fantasy",
    "Gourmet",
    "Boys Love",
    "Drama",
    "Comedy",
    "Mystery",
    "Girls Love",
    "Slice of Life",
    "Adventure",
    "Romance",
    "Sci-Fi",
    "Erotica",
    "Hentai",
  ];
  
  const [active, setActive] = useState<string | null>(null);
  const Logout=async()=>{
    try {
      const res=await axios.get("/api/logout");
      if(res.data.success){
        toast.success("Logged Out Successfully");
        router.push("/login");
        console.log("tologin");
        
      
      }else{
        toast.error("ERROR Logging Out,Please try Again")
      }
    } catch (error) {
      console.log(error);
      
    }
   
  }
  
  return (
    <div className={cn("fixed top-6 border-[1px] border-white rounded-full inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <Toaster/>
        <Link href="/home">Home</Link>
        <MenuItem setActive={setActive} active={active} item="Genres">
          <div className="text-sm grid grid-cols-5 gap-10 p-2">
            {animetypes.map((animetype, key: number) => (
            
            <div key={key} onClick={() => getData(animetype)}>
            <HoverBorderGradientDemo className="w-max" type={animetype} />
          </div>
            ))}
          </div>
        </MenuItem>
        <Link href="/home">About</Link>
        <button onClick={Logout}>Logout</button>
      </Menu>
    </div>
  );
}
