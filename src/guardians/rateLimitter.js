import { respond } from "../helpers/senders.js";

function rateLimiter(options = {}){
    const {windowMs = 60000, maxReqs = 100} = options;
    const IPs = new Map();
    return function(req, res, next = () => {}){
        let ip = req.headers["X-Forwaded-For"];

        if(ip){
            ip = ip.split(":")[0].trim();
        }else{
            ip = req.socket.remoteAdress
        }

        const curDate = Date.now();
        
        let limit = IPs.get(ip);

        if(IPs.has(ip)){
            if(curDate > limit.resetTime + windowMs){
                IPs.delete(ip)
            }
        }

        if(limit && limit.resetTime < curDate){
            limit.tokens = 0;
            limit.resetTime = curDate + windowMs;
        }

        if(!limit){
            limit = {tokens: 0, resetTime: curDate + windowMs}
            IPs.set(ip, limit)
        }

        if(limit.tokens > maxReqs){
            const retryAfter = Math.ceil((limit.resetTime - curDate) / 1000);
            console.log(retryAfter);
            respond(res, 429, `REQUEST LIMIT REACHED: retry after: ${retryAfter.toString()}`)
            return;
        }

        limit.tokens++

        next();
    }
}

export { rateLimiter }