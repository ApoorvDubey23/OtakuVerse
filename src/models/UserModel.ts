import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
   
    verifyToken:String,
    verifyTokenExpiry:Date,
    ForgotPasswordToken:String,
    ForgotPasswordTokenExpiry:Date,
    LikedAnime:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"LikedAnime"
    }],
    WatchLaterAnime:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"WatchLater"
    }]
})
const User = mongoose.models.User || mongoose.model('User', UserSchema);
 export default User;