import { serverConfig } from "../config/server.js"
export function securityHeaders(res){
    res.setHeader('Access-Control-Allow-Origin', serverConfig.allowance.origin);
    res.setHeader('Access-Control-Allow-Methods', serverConfig.allowance.methods);
    res.setHeader('X-Frame-Option', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block')
}