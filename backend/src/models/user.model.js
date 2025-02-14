import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema=new mongoose.Schema(
    {
        username : {
            type: String, 
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email : {
            type: String, 
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        password : {
            type: String, 
            required:[true, "Password is required"],
            trim:true,
        },

        socialMedia : [
            {
                type:Schema.Types.ObjectId,
                ref:"socialMedia"
            }
        ],
        Token : {
            type: String
        }
    }, {timestamps:true});


    userSchema.pre("save", async function (next) {
        if(!this.isModified("password")) return next();
    
        this.password = await bcrypt.hash(this.password, 10)
        next()
    })
    //define custome domain
    userSchema.methods.isPasswordCorrect = async function (password){
        return await bcrypt.compare(password, this.password)
    }

//Generate custome token// In your model.js
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRACY }
    );
};


export const User=mongoose.model("User", userSchema);