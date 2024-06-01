import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const response= NextResponse.json({
            message:"Logout Successful",
            success:true
        },{status:200});
        response.cookies.set("token","",{
            httpOnly:true,expires:new Date(0)
        });
        console.log(response);
        
        return response;
        
    } catch (error) {
        return NextResponse.json({
            message:"Error logging Out"
        },{status:400})
    }
}