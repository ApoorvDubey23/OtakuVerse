import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import LikedAnime from "@/models/LikedAnime";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { animeData, userId } = await req.json();
    const user=await User.findById(userId);
    if(!user){
      return NextResponse.json({message:"User Does NOT exist"},{status:400})

    }
    
    const LikeAnime=new LikedAnime({
      data:animeData,
    })
    await LikeAnime.save();
    
    user.LikedAnime.push(LikeAnime._id);
    await user.save();
    return new Response(JSON.stringify({ message: 'Liked anime saved successfully' }), { status: 201 });
    



  }catch(error){
    console.log(error);
    
    return NextResponse.json({message:"error liking the anime"},{status:400})
  }
}
