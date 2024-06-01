"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

interface AnimeData {
  title: string;
  image: string;
  alternativeTitles: string[];
  genres: string[];
  ranking: number;
  type: string;
  episodes: number;
  status: string;
  synopsis: string;
  link: string;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  // Add more fields if needed
}

export default function AnimeInfo({ params }: any) {
  const router = useRouter();
  const [data, setData] = useState<AnimeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [userdata, setUserData] = useState<UserData | null>(null);

  const getUserData = async () => {
    try {
      const response = await axios.get<{ data: UserData }>("/api/getuserData");
      setUserData(response.data.data);
      console.log(response);
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchData = async () => {
    console.log(params);
    setLoading(true);
    try {
      const options = {
        method: 'GET',
        url: `https://anime-db.p.rapidapi.com/anime/by-id/${params.id}`,
        headers: {
          'X-RapidAPI-Key': 'dfdf3c7fe0msh2af30fd63e29d72p15bd47jsn4fdfbb891600',
          'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      setData(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
    fetchData();
  }, []);

  const likeAnime = async () => {
    if (!userdata || !data) {
      console.error("User data or anime data is not available");
      return;
    }

    try {
      await axios.post("/api/liked", {
        animeData: data,
        userId: userdata._id,
      });
      toast('Liked', {
        icon: '❤️',
      });
    } catch (error) {
      toast.error("Error");
      console.error("Error liking anime:", error);
    }
  };
  const Watchlater = async () => {
    if (!userdata || !data) {
      console.error("User data or anime data is not available");
      return;
    }

    try {
      await axios.post("/api/watchlater", {
        animeData: data,
        userId: userdata._id,
      });
      toast('Added To Watch Later', {
        icon: '+',
      });
    } catch (error) {
      toast.error("Error");
      console.error("Error adding anime:", error);
    }
  };

  return (
    loading ? (
      <div className="h-[100vh] w-[100vw] flex-col items-center justify-center flex"><img className="h-[8rem] w-[12rem]" src="/loading.gif" alt=""/>Loading...</div>
    ) : (
      <div className="relative h-fit">
        
        <Toaster/>
        <div
          className="absolute top-0 h-[80vh] w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${data?.image}), linear-gradient(to bottom, transparent, black)`,
            backgroundBlendMode: "multiply",
            filter: "blur(8px)",
            zIndex: 0,
          }}
        ></div>

        <div className="relative z-10 p-[10vw] pt-[30vh] font-serif">
        <Link className=" absolute top-4 left-3  text-3xl  cursor-pointer" href="/home"><button className=" bg-black p-2 rounded-2xl hover:scale-125 duration-250">⬅ Back to Home</button></Link>
          <div className="flex flex-wrap">
            <img
              src={data?.image || ""}
              alt=""
              className="w-[22rem] h-auto mr-4 rounded-md"
            />
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-8xl font-bold mb-2">{data?.title}</h1>
                <h4 className="text-2xl mb-4">
                  {data?.alternativeTitles.join(", ")}
                </h4>
                <div className="flex gap-10">
                  <button
                    onClick={likeAnime}
                    className="font-mono py-[1px] px-[20px] border-white border-[1px] hover:bg-white hover:text-black text-white"
                  >
                    Like
                  </button>
                  <button onClick={Watchlater} className="font-mono py-[1px] px-[20px] border-white border-[1px] hover:bg-white hover:text-black text-white">
                    + Add to Watch Later
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <p>
                  <span className="text-3xl font-bold">Genres:</span>{" "}
                  {data?.genres.join(", ")}
                </p>
                <p>
                  <span className="text-3xl font-bold">Ranking:</span>{" "}
                  {data?.ranking}
                </p>
                <p>
                  <span className="text-3xl font-bold">Type:</span>{" "}
                  {data?.type}
                </p>
                <p>
                  <span className="text-3xl font-bold">Number of Episodes:</span>{" "}
                  {data?.episodes}
                </p>
                <p>
                  <span className="text-3xl font-bold">Status:</span>{" "}
                  {data?.status}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 py-3 text-3xl">
            <p>{data?.synopsis}</p>
          </div>
          <Link href={`${data?.link}`}>
            <button className="mt-[3vh] self-center text-4xl font-mono py-[1px] px-[20px] border-white border-[1px] hover:bg-white hover:text-black text-white">
              Link to Anime
            </button>
          </Link>
        </div>
      </div>
    )
  );
}
