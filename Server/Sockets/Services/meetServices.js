import { Meet } from "../../Models/meetModel.js"

export async function verifyMeet(meetId){

    const meet = await Meet.findOne({meetId : meetId});

    if(!meet){
        return null;
    }

    return meet;
}