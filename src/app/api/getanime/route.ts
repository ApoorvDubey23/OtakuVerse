import { NextRequest, NextResponse } from "next/server";

const axios = require('axios');


export async function POST(req:NextRequest){
    
    console.log("requestjson");
// console.log(req.json());


const{searchedanime,animetype}=await req.json();
console.log(searchedanime,animetype);





const options = {
  method: 'GET',
  url: 'https://anime-db.p.rapidapi.com/anime',
  params: {
    page: '1',
    size: '1000',
    search: `${searchedanime}`,
    genres: `${animetype=="All"?"":animetype}`,
    sortBy: 'ranking',
    sortOrder: 'asc'
  },
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	// console.log(response.data);
    return NextResponse.json(response.data);
    return NextResponse.json("hello");

} catch (error) {
	console.error(error);
    return NextResponse.json({
        message:"error fetching anime"
    },{status:400});

}}