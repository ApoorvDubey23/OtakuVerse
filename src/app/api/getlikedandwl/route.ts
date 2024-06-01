import { NextRequest,NextResponse } from "next/server";
import User from "@/models/UserModel";
import connectDB from "@/dbConfig/dbConfig";
connectDB();
export async function POST(req:NextRequest){
    
    
    const {userId}=await req.json();
    try {
        console.log("populaton");
        console.log(userId);
        
        const user = await User.findById(userId).populate('LikedAnime').populate("WatchLaterAnime");
        console.log(user);
        

        return NextResponse.json(user);

    } catch (error) {
        return NextResponse.json(error);
    }
}