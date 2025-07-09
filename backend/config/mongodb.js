import mongoose from "mongoose"

export default async function connectDB(){
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/colthingDB`);
        console.log('connected to mongodb');
    }
    catch(err){
        console.log('error in db connection',err.message);
    }
}

process.on('SIGINT',async()=>{
    try{
        await mongoose.connection.close();
        process.exit(0);
    }
    catch(err){
        console.log("Error in closing mongodb connection",err);
        process.exit(1);
    }
})