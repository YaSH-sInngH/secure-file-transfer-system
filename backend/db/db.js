import mongoose from "mongoose";

const DBConnection = async () => {
    try{
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database Connected Successfully `);
    
    }catch(error){
        console.error('Error Connecting with Database :(', error.message);
        process.exit(1);
    }
}

export default DBConnection;