import connectDB from '@/dbConfig/dbConfig'
import User from '@/models/UserModel';
import { NextRequest,NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
// import { sendEmail } from '@/app/helper/mailer';
// import { useRouter } from 'next/navigation';
connectDB();

export async function POST(request:NextRequest){
    // const router=useRouter();
    try {
        const reqbody=await request.json();  
        JSON.stringify(reqbody);      
        const {username,email,password}=reqbody;
       
        if(username&&email&&password){
            const sameuser= await User.findOne({email});
            if(sameuser){
                console.log(sameuser);
                
                return NextResponse.json({message:"user Already exists"},{status:400})
            }
           const Hashpassword=await bcrypt.hash(password,10);
           const newUser=new User({
            username,
            email,
            password:Hashpassword
           })
           try {
            const creationresponse=await newUser.save();
            //sending verfication email
            // await sendEmail({email,emailType:"VERIFY",userId:newUser._id});
            // console.log("email sent");
            console.log("created");
            
            console.log(creationresponse);
            
           return NextResponse.json({
            message:"User Created Successfully",
            success:true,
            creationresponse

           })
           

           } catch (error) {
            console.log("error while creating user",error);
            return NextResponse.json({
                message:"Error Creating User , Please Retry",
                success:false,
            })
            
            
           }
           
           

        }else{
            return NextResponse.json({message:"All fields required"});
        }
        
    } catch (error:any) {
        return NextResponse.json({error:error.message});
    }
}