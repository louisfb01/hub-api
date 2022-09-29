import { createNodeRedisClient } from 'handy-redis';
var crypto = require('crypto')

const HOST = process.env.CODA_HUB_API_REDIS_HOST ? process.env.CODA_HUB_API_REDIS_HOST : 'localhost'
const PORT = Number(String(process.env.CODA_HUB_API_REDIS_PORT)) ? Number(String(process.env.CODA_HUB_API_REDIS_PORT)) : 7777
const client = createNodeRedisClient({ host: HOST, port: PORT});

async function setRedisKey(result: any){
    
    const redisKey = generateToken();
    console.log(redisKey);
    await client.setex(redisKey, 60*60*24, JSON.stringify(result)); //set key expiry to 24h
    return redisKey;
}

async function setRedisJobId(result: any, jobID: string){
    await client.setex(jobID, 60*60*24, JSON.stringify(result))
    return jobID;
}

async function getRedisKey(key: string){
    const dataset = await client.get(key);
    await client.expire(key, 60*60*24); //reset key expiry
    if(dataset === null){
        return '{}';
    }
    else{
        return dataset;
    }
}

async function addList(jobID:string, data: any){
    await client.lpush(jobID, JSON.stringify(data));
}

async function getListLength(jobID:string) {
    return await client.llen(jobID);
}

async function listIndex(jobID: string, index:number){
    return await client.lindex(jobID, index);
}

async function listRange(jobID: string, start: number, end: number){
    return await client.lrange(jobID, start, end);
}

function generateToken() {
  return crypto.randomBytes(12).toString('base64');
}

async function findKeys(pattern: string){
    return await client.keys(pattern);
}

export default {
    setRedisKey,
    getRedisKey,
    setRedisJobId,
    addList,
    getListLength,
    listIndex,
    listRange,
    findKeys
}