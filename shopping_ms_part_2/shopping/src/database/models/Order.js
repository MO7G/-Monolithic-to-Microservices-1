const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderId: String,
    customerId: String,
    amount: Number,
    status: String,
    txnId: String,
    items: [
        {
            products:{
                _id:{type:String,required:true},
                name:{type:String},
                banner:{type:String},
                desc:{type:String},
                type:{type:String},
                unit:{type:Number},
                price:{type:Number},
                suplier:{type:String},
            },
            unit:{type:Number , require:true}
        }
    ]
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports =  mongoose.model('order', OrderSchema);