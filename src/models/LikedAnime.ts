
import mongoose from "mongoose";
const LikedAnimeSchema=new mongoose.Schema({
   data:{
    type:Object
   }
},{timestamps:true})

const LikedAnime=mongoose.models.LikeAnime || mongoose.model('LikedAnime', LikedAnimeSchema);
export default LikedAnime;