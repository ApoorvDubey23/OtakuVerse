
import mongoose from "mongoose";
const WatchLaterSchema=new mongoose.Schema({
   data:{
    type:Object
   }
},{timestamps:true})

const WatchLater=mongoose.models.WatchLater || mongoose.model('WatchLater', WatchLaterSchema);
export default WatchLater;