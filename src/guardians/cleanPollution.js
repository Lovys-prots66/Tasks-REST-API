function cleanPollution(obj) {
    
    const blackList = ['__proto__', 'prototype', 'constructor']

    for(const key of Object.keys(obj)){
        if(blackList.includes(key)){
            delete obj[key];
            continue;
        }

        if(typeof key === "object" && obj[key] !== null){
            cleanPollution(obj[key]);
        }
    }
    
}

export { cleanPollution };