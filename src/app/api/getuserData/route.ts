import User from "@/models/UserModel";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(req:NextRequest){
    try {
        const token=req.cookies.get("token")?.value||"";
        const decodedToken:any=await jwt.verify(token,process.env.TOKEN_SECRET!);
        const user=await User.findOne({_id:decodedToken.id}).select("-password");
        console.log("logging user");
        
        // console.log(user);
        
        return NextResponse.json({
            message:"User Found",
            data:user
        })


        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            message:"error fetching user info",

    },{status:400})
    }
}