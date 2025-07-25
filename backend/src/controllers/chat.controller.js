import asyncHandler from "express-async-handler"
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";


const accessChat = asyncHandler(async(req,res)=>{
const {userId} = req.body;
if(!userId){
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
}
var isChat = await Chat.find({
    isGroupChat:false,
    users:{$all:[req.user._id,userId]}
})
.populate("users","-password")
.populate("latestMessage");

isChat=await User.populate(isChat,{
    path:'latestMessage.sender',
    select:"name avatar email",
});

if(isChat.length>0){
    res.send(isChat[0]);
}
else{
    var chatData={
        chatName:"sender",
        isGrouptChat:false,
        users:[req.user._id,userId]
    };
    try{
        if(!Array.isArray(chatData.users)|| chatData.users.length==0){
            return res.status(400).json({message:"Chat must have users"})
        }
        const createdChat= await Chat.create(chatData);
        const fullChat = await Chat.findOne({_id:createdChat._id}).populate("users","-password");
        res.status(200).send(fullChat);
    }
    catch(error){
        res.status(400);
        throw new ApiError(error.message);
    }
}
})

const fetchChats = asyncHandler(async(req,res)=>{
    try {
        await Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async (result)=>{
            result= await User.populate(result,{
                path:"latestMessage.sender",
                select:"name avatar email",
            });
            res.status(200).send(result)
        })
    } catch (error) {
        res.status(400);
        throw new ApiError(400,error.message)
    }
})

const createGroupChat= asyncHandler(async(req,res)=>{
if(!req.body.users || !req.body.name){
    return res.status(400).send({message:"All fields are required"})
}

var users = JSON.parse(req.body.users);
if(users.length<2){
    return res.status(400).send("More than 2 users are required to form a group chat");
}
users.push(req.user);
try {
    const groupChat= await Chat.create({
        chatName:req.body.name,
        users:users,
        isGroupChat:true,
        groupAdmin:req.user
    });
    const fullGroupChat = await Chat.findOne({_id:groupChat._id})
    .populate("users","-password")
    .populate("groupAdmin","-password");

    res.status(200).json(fullGroupChat)
} catch (error) {
    res.status(400)
    throw new ApiError(400,error.message)
}
})

const renameGroup = asyncHandler(async(req,res)=>{
   const {chatId,chatName}= req.body;
   const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
        chatName,
    },
    {
        new:true
    }
   )
   .populate("users","-password")
   .populate("groupAdmin","-password");
   if(!updatedChat){
    res.status(404)
    throw new ApiError(404,"Chat not Found")
   }
   else{
    res.json(updatedChat)
   }
})

const addToGroup= asyncHandler(async(req,res)=>{
   const {chatId,userId}=req.body;
   const added = await Chat.findByIdAndUpdate(chatId,{
    $push:{users:userId},
    
   },{new:true})
   .populate("users","-password")
   .populate("groupAdmin","-password")
   if(!added){
    res.status(404)
    throw new ApiError(404,"Chat Not Found")
   }
   else{
    res.json(added);
   }
});


const removeFromGroup=asyncHandler(async(req,res)=>{
const {chatId,userId}=req.body;
   const removed = await Chat.findByIdAndUpdate(chatId,{
    $pull:{users:userId},
    
   },{new:true})
   .populate("users","-password")
   .populate("groupAdmin","-password")
   if(!removed){
    res.status(404)
    throw new ApiError(404,"Chat Not Found")
   }
   else{
    res.json(removed);
   }
})
export {accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup}