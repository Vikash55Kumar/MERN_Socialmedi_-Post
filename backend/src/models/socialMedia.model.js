import mongoose, { Schema } from "mongoose";

const socialMediaSchema=new mongoose.Schema(
    {
        title : {
            type: String, 
            required:true,
        },

        description : {
            type: String, 
            required:true,
        },
        avatar: {
            type: String,
            required: true
        },
        owner : {
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        comment : [
            {
                type:Schema.Types.ObjectId,
                ref:"Comment",
            }
        ]
    }, {timestamps:true});

export const SocialMedia=mongoose.model("SocialMedia", socialMediaSchema);