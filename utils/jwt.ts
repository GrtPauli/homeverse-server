import config from "config"
import jwt from "jsonwebtoken"
import fs from "fs"

const publicKey = fs.readFileSync('./public.key', 'utf8');
const privateKey = fs.readFileSync('./private.key', 'utf8');

// const publicKey = Buffer.from("LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQ0KTUlJQ1hnSUJBQUtCZ1FDTTV0UkpMTjNoeUQzeEpwWlRMeXcvbTVmdmU4MmVCZUZuRDQ3YkozdkRDc2FsTWsxag0KdGF2elpNS0tBMzQwK1VWRi9xUTlZcDk5aVdSU2VSNmhYMDdMK2w3MGpIQlllRmxDeU04bm5pOGcxem1WRGtuQw0KWXdQQmJneE1pSHV0Y3hHOE83eXNlbEordXBvZnNzRkU4MDFiRjdmb0w3YVNwckx2eWxZWWRsUFRWd0lEQVFBQg0KQW9HQWVrVW8vS01SbklkdXNTQ0NISWQ0QjI2WEJ6dlE3NHM4MFhsZngyL1k1eVVud2wwSGFUcFNqL0RsSEd6eA0KalRpdTA1R29wcGc1dk8rSC9rV2F2Z0I5MkJ3dW55T0VZSmo0MnB6ZE82bVk5bGRyNm1IWEtvanNvWmFNd0VEQw0KNk1jSjNpdlZWWEk5cGc5VWovUER6enVoTFFaME9sMTlhMG1laTBveG1YR0cweWtDUVFESkpBa2xxbHNkU3RYMA0KVVpKU3JwbkkxQTNJN0MyZjIrVWhVbExuTHkxcmxjejl2cTVIanA4RDBpOVNKMDdRUmdJa0hnVTRQaHhnOGRoUQ0KN2E1U1ZHZFRBa0VBczFUT1JJWTQyN3RWMmdGbm5xMG96S09GMU9RRjc3NzRnNFp4bk8xZWlORGR4Z1NtT0ZVOA0KbXZSNFgyVm5LQWwwcDZwazQwYzJpRUpKaC9xOVArczNiUUpCQUwwL2VKUEZ5MkN1THN4bmk0TGI0TG5DT3c0Vw0KbVg3VlNLcW5hSFU0UUVYL2RoWXd1STEvTlVKRkdsenp1d1hmT05oK25tNmlrZFRzOTVoOWFRenhlUjBDUVFDbw0KbHFKdll5dVN6dFBQNWlBdTJTVVE5TzI5RFR6VGZWb044OWRkS3Y0RGF6QUNsNTVZT1RHSGp5cVdyRExGUGRadw0KUlUwaEtYS0h1S0Y5OTJmdzdrVWxBa0VBeHNpVmVUTGdkMHliZmh0R2M0eDRoOGNpeWxSRDRDV3QzSjN5T2xWaw0KM3ZHaG1UMTlIZXRpWms2ZTh1akdOSUxDQVNxN0ZqbENDcUhOZEcyUGhJaWcxZz09DQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQ==", 
// "base64")
// const privateKey = Buffer.from("LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1JR2ZNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R05BRENCaVFLQmdRQ001dFJKTE4zaHlEM3hKcFpUTHl3L201ZnYNCmU4MmVCZUZuRDQ3YkozdkRDc2FsTWsxanRhdnpaTUtLQTM0MCtVVkYvcVE5WXA5OWlXUlNlUjZoWDA3TCtsNzANCmpIQlllRmxDeU04bm5pOGcxem1WRGtuQ1l3UEJiZ3hNaUh1dGN4RzhPN3lzZWxKK3Vwb2Zzc0ZFODAxYkY3Zm8NCkw3YVNwckx2eWxZWWRsUFRWd0lEQVFBQg0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t",
// "base64")

// console.log("Private Key : " + privateKey);
// console.log("Public Key : " + publicKey);

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, "someadvancepasswordheredonttellanyone", {
        // ...[options && options],
        expiresIn: "60 days",
    })

    // return jwt.sign(object, privateKey, {
    //     // ...[options && options],
    //     expiresIn: "60 days",
    //     algorithm: 'RS256'
    // })
}

export function verifyJwt<T>(token: string): T | null {
    try {
        // console.log(token)
        const decoded = jwt.verify(token, "someadvancepasswordheredonttellanyone") as T
        // const decoded = jwt.verify(token, publicKey) as T
        return decoded
    }

    catch(e) {
        return null
    }
}