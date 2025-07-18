import { ApiError } from "../utils/ApiError.js"

const notFound =(req,res,next)=>{
    const error= new Error(`Not found -${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler= (err,req,res,next)=>{
    const statusCode = res.statusCode===200? 500:res.statusCode;
    res
    .status(statusCode)
    .json(
        new ApiError(statusCode,err.message)
    )
}

export {notFound,errorHandler}