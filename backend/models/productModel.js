import mongoose from 'mongoose';
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:[String],
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    bestSeller:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

const Product=mongoose.models.product||mongoose.model('product',productSchema);
export default Product;