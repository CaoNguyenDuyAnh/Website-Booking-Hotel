import mongoose from "mongoose";
const HotelSchema= new mongoose.Schema({
    name:{
        type: String,
        require:true,
    },
    type:{
        type: String,
        require:true,
    },
    city:{
        type: String,
        require:true,
    },
    address:{
        type: String,
        require:true,
    },
    distance:{
        type: String,
        require:true,
    },
    photo:{
        type: [String],
        
    },
    title:{
        type: String,
        require:true,
    },
    desc:{
        type: String,
        require:true,
    },
    rating:{
        type: Number,
        min:0,
        max:5,
    },
    rooms:{
        type: [String],
    },
    cheapestPrice:{
        type: Number,
        require:true,
    },
    longitude:{
        type: Number,
        require:true,
    },
    latitude:{
        type: Number,
        require:true,
    },
    featured:{
        type: Boolean,
        default: false,
    },
});
export default mongoose.model("Hotel", HotelSchema)