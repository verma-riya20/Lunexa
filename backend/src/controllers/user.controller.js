import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.Model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken'

//generateaccesandrefreshtoken
const generateaccesandrefreshtoken=async( userId)=>{
    try{
        const user=await User.findById(userId)
       const accessToken= user.generateAccessToken()
       const refreshToken= user.generateRefreshToken()

       //save refresh token in db
       user.refreshtoken=refreshToken;
       await user.save({validatebeforeSave:false})
         return {accessToken,refreshToken}

    }catch(error){
        throw new ApiError(500,"Something went wrong")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
  const {fullname,email,password,phone,address}=req.body;
  
//check for empty
  if(
    [fullname,email,password,phone,address].some((field)=>field?.trim()==="")
  ){
    throw new ApiError(400,"All fields are required")
  }

  //check for existing user
  const existingUser=await User.findOne({email});
    if(existingUser){
        console.log(existingUser)
        throw new ApiError(409,"User already exists")
    }

   const user= await User.create({
        fullname,
        email,
        password,
        phone,
        address
    })

    console.log('User created:', user);

    const createdUser=await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500,"User not created")
    }
    //response
    return res.status(201).json(
        new ApiResponse(201,"User created successfully",createdUser
        ))
});

//login user
const loginUser=asyncHandler(async(req,res)=>{
    //req.body --data
    //email,username
    //find user
    //check password
    //access token and refresh token
   //send cookies
    const {email,password}=req.body;
    if(!email && !password){
        throw new ApiError(400,"Email and Password are required")
    }
    const user=await User.findOne({email});
    if(!user){
        throw new ApiError(404,"User not found")
    }
    if(!(await user.isPasswordCorrect(password))){
        throw new ApiError(401,"Invalid email or password")
    }
   const {accessToken,refreshToken}= await generateaccesandrefreshtoken(user._id)

   const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

   const options={
         httpOnly:true,
         secure:true
   }
   return res
   .status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshToken)
   .json(
    new ApiResponse(
        200,{
            user:loggedInUser,accessToken,refreshToken
        },
       " User loggen In"
    )
   )
})

//logout 
const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                refreshToken:undefined,
            }
        },
        {
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure:true
  }
  return res.status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(
    new ApiResponse(200,{},"user logged out")
  )
})

const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingRefreshToken=req.cookies.
    refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401,"unauthorized access")
    }
    try {
    const decodedToken=jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
        )
   const user= await User.findById(decodedToken._id)
   if(!user){
         throw new ApiError(401,"Invalid refresh token")
   }
   if(incomingRefreshToken!==user?.refreshToken){
      throw new ApiError(401,"Refresh token is expired or used")
   }

   const options={
    httpOnly:true,
    secure:true
   }

  const {accessToken,newRefreshToken}= await generateaccesandrefreshtoken(user._id)

  return res.status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",newRefreshToken)
    .json(
        new ApiResponse(
            200,{
                accessToken,refreshToken:newRefreshToken
            },
         " Access token refreshed"
        )
     )
    
   } catch (error) {
    throw new ApiError(401,error?.message|| "invalid refresh token")
   }
})

export { registerUser,loginUser,logoutUser,refreshAccessToken };