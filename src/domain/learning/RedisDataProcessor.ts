import { commandOptions, createClient } from 'redis';
var crypto = require('crypto')

const USERNAME = ''
const PASSWORD = process.env.CODA_HUB_CACHE_DB_PASSWORD ? process.env.CODA_HUB_CACHE_DB_PASSWORD : ''
const HOST = process.env.CODA_HUB_CACHE_DB_HOST ? process.env.CODA_HUB_CACHE_DB_HOST : 'localhost'
const PORT = Number(String(process.env.CODA_HUB_CACHE_DB_PORT)) ? Number(String(process.env.CODA_HUB_CACHE_DB_PORT)) : 7777
const client = createClient({ url: `redis://${USERNAME}:${PASSWORD}@${HOST}:${PORT}` })
client.connect();

async function setRedisKey(result: any) {

    const redisKey = generateToken();
    await client.setEx(redisKey, 60 * 60 * 24, JSON.stringify(result)); //set key expiry to 24h
    return redisKey;
}

async function setRedisJobId(result: any, jobID: string) {
    await client.setEx(jobID, 60 * 60 * 24, JSON.stringify(result))
    return jobID;
}

async function getRedisKey(key: string) {
    const dataset = await client.get(key);
    await client.expire(key, 60 * 60 * 24); //reset key expiry
    if (dataset === null) {
        return '{}';
    }
    else {
        return dataset;
    }
}

async function addList(jobID: string, data: any) {
    await client.lPush(jobID, data);
}

async function getListLength(jobID: string) {
    return await client.lLen(jobID);
}

async function listIndex(jobID: string, index: number) {
    return await client.lIndex(jobID, index);
}

async function listRange(jobID: string, start: number, end: number) {
    return await client.lRange(jobID, start, end);

}

async function listBufferRange(jobID: string, start: number, end: number) {
    return await client.lRange(
        commandOptions({ returnBuffers: true }),
        jobID, start, end);

}

function generateToken() {
    return crypto.randomBytes(12).toString('base64');
}

async function findKeys(pattern: string) {
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
    findKeys,
    listBufferRange
}