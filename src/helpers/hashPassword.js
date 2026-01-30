import crypto from "node:crypto"

export function hashPsw(psw){
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString("hex");

        crypto.scrypt(psw, salt, 64, {N: 16384, maxmem : 64 * 1024 * 1024}, (err, derivedKey) => {
            if(err) reject(err);
            resolve(['scrypt', salt, derivedKey.toString("hex")].join(":"));
        })
    })
}