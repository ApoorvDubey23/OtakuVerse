import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import WatchLater from "@/models/WatchLater";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { animeData, userId } = await req.json();
    const user=await User.findById(userId);
    if(!user){
      return NextResponse.json({message:"User Does NOT exist"},{status:400})

    }
    
    const WatchLaterAnime1=new WatchLater({
      data:animeData
    })
    await WatchLaterAnime1.save();
    
    user.WatchLaterAnime.push(WatchLaterAnime1._id);
    await user.save();
    return new Response(JSON.stringify({ message: 'Watch Later anime saved successfully' }), { status: 201 });
    



  }catch(error){
    console.log(error);
    
    return NextResponse.json({message:"error adding watch later"},{status:400})
  }
}
