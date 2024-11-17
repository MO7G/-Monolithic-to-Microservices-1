
module.exports = (app)=>{


    // exposing a webhook for other serivces 
    app.use('/app-events',async(req,res,next)=>{
        const {payload} = req.body;
        service.SubscribeEvents(payload);


        console.log("========= Products Service received Event =========");
        return res.status(200).json(payload);
    })
}