import asyncHandler from "express-async-handler"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens=async(userId)=>{
    try {
        const user=await User.findById(userId)
        const accessToken= user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Something went wront while generating access and refresh tokens")
    }
}

const registerUser=asyncHandler(async (req,res)=>{
const {username, email,password,avatar}=req.body

if(!username || !email || !password){
    throw new ApiError(400,"Please fill the required fields")
}

const userExists= await User.findOne({email})
if(userExists){
    throw new ApiError(400,"User Already Exists")
}

const user=await User.create({
    username,
    email,
    password,
    avatar,
});
const createdUser = await User.findById(user._id).select("-password -refreshToken")
if(!createdUser){
    throw new ApiError(402,"Something went wrong registering the user")
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully")
)

})

const loginUser= asyncHandler(async(req,res)=>{
    const {email,username,password} =req.body
    if(!(email||username)){
        throw new ApiError(400,"username of email is required")
    }
    const user= await User.findOne({
        $or:[{username},{email}]
    })
    if(!user){
        throw new ApiError(404,"User doesn't exist")
    }

    const isPasswordValid= await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid User credentials")
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options ={
        httpOnly:true,
        secure:true,
        sameSite:"None"
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {user:loggedInUser,accessToken,refreshToken},
            "User Logged In Successfully"
        )
    )
})

export {
    registerUser,
    loginUser
}
