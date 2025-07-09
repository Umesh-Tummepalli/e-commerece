import mongoose from "mongoose"

const ordersSchema=new mongoose.Schema({
    uid:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    prodId:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    prodSize:{
        type:String,
        required:true,
        default:'S',
    },
    sellerId:{
        type:mongoose.Types.ObjectId,
        default:null,
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    },
    payementStatus:{
        type:String,
        default:'pending'
    },
    paymentMode:{
        type:String,
        required:true
    },
    orderGroupId:{
        type:mongoose.Types.ObjectId,
    },
    quantity:{
        type:Number,
        default:1
    }
},{timestamps:true})

const ordersModel= mongoose.models.orders || mongoose.model('orders',ordersSchema);
export default ordersModel;