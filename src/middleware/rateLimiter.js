import ratelimit from '../config/upstash.js';

const rateLimiter = async(req,res,next) => {
    try {
        const identifier = req.headers['x-user-id'] || req.ip;
        const {success} = await ratelimit.limit(identifier)

        console.log("Limiti Kontrol Edilen Kimlik:", identifier);

        if(!success){
            console.log("çok fazla")
            return res.status(429).json({
                message:"Too many requests, please try again later"
            })
        }

        next();
    } catch (error) {
        console.log("Rate limit error",error);
        next(error);
    }
}

export default rateLimiter;