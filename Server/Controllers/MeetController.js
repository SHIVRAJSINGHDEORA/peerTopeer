import { Meet } from "../Models/meetModel.js";
import { User } from "../Models/UserModel.js";

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

export {getMeet};
