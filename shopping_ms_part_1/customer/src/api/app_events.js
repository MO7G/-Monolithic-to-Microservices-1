const CustomerService = require("../services/customer-service")





module.exports = (app)=>{
    const service = new CustomerService();

    // exposing a webhook for other serivces 
    app.use('/app-events',async(req,res,next)=>{
        const {payload} = req.body;
        const result = await service.SubscribeEvents(payload);
        console.log("========= Customer Service received Event =========");
        res.status(200).json(result);



    })
}