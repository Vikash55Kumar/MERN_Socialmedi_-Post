import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const likeSchema = new Schema({
        
    socialMedia:{
            type:Schema.Types.ObjectId,
            ref:"SocialMedia",
            required:true
    },
    likedBy:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required: true
    },
}, {timestamps:true})

likeSchema.plugin(mongooseAggregatePaginate)

export const Like =mongoose.model("Like", likeSchema)