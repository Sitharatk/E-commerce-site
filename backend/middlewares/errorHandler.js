import CustomError from "../utils/CustomError.js";

const errorHandler=(req,res,next)=>{
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: "Something went wrong" });

}
export default errorHandler