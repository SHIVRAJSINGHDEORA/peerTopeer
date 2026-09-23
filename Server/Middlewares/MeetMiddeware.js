import { Meet } from "../Models/meetModel.js";

const verifyMeet = async (req, res,next) => {
  const meetId = req.params.id;

  try {
    const meet = await Meet.findOne({ meetId: meetId });

    if (!meet) {
      return res.status(404).json({ message: "No Call Found", status: false });
    }

    req.meet = meet;
    next();
  } catch (err) {
    return res.status(500).json({status: false , message: "Something went wrong" });
  }
};

export { verifyMeet };
