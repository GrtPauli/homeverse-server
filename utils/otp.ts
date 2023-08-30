import TwilioSDK from "twilio";

const accountSid = "AC19e435677381c0cc84df75fdc1621c90";
const authToken = "75081d406508db01ef8e0cb035293406"
const verifySid = "VAf8cd7e3f4aae647147b00880e9d89927";
const client = TwilioSDK(accountSid, authToken)

const sendOtp = (number: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        client.verify.v2.services(verifySid)
        .verifications.create({ to: number, channel: "sms" })
        .then((verification) => console.log(verification.status))
        .then(() => {
            resolve("OTP Sent")
        })
        .catch((err) => {
            reject(err)
        })
    })
}

const verifyOtp = (number: string, otp: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: number, code: otp })
        .then((verification_check) => {
            resolve(verification_check.status)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export { sendOtp, verifyOtp }