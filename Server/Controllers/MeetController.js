import { Meet } from "../Models/meetModel.js";
import { User } from "../Models/UserModel.js";
import crypto from "node:crypto";

const getMeet = async(req, res) => {
    const meet = req.meet;
    const user = req.user;

    const host = await User.findOne({_id : meet.host});

    return res.json({
        meetId : meet.meetId,
        host : host.username,
        user : user.username,
    })
};

const createMeet = async(req,res)=>{
    const user = req.user;

    try{
        const id = crypto.randomBytes(6).toString('hex');
        const meet = await Meet.insertOne({meetId : id, host : user._id});

        return res.status(200).json({message : "Meet Created !", status : true, id : id});

    }catch(err){
        console.log(err.message);
        return res.status(500).json({message : "Something went wrong!", status:false});
    }
}

export {getMeet,createMeet};
