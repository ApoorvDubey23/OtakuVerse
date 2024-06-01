import connectDB from '@/dbConfig/dbConfig'
import User from '@/models/UserModel';
import { NextRequest,NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import jwt from "jsonwebtoken"
import { user } from '@nextui-org/theme';
connectDB();

export async function POST(request:NextRequest){
   
        const reqbody=await request.json();  
        JSON.stringify(reqbody);     
        console.log(reqbody);
         
        const {email,password}=reqbody;
        try {
            const founduser=await User.findOne({email});
            if(!founduser){
                return NextResponse.json({error:"User Does NOT exist"},{status:400});
            }
            const checkpassword=await bcrypt.compare(password,founduser.password);
            if(!checkpassword){
                return NextResponse.json({
                    message:"Invalid password",success:false
                },{status:400})
            }
            const tokenData={
                id:founduser._id,
                username:founduser.username
            }
            const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"2h"});
            const response=NextResponse.json(
                {
                    message:"Login Successful",
                    success:true,
                    

                }
            )
            response.cookies.set("token",token,{httpOnly:true});
            return response;
        
    } catch (error:any) {
        return NextResponse.json({error:error.message});
    }
}