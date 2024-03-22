const User = require("../models/user");
const follow= async (req, res) => {
    try {
        const senderId = req.user.userId;// Sender id
        const receiverId = req.params.id; // Receiver id
        if (senderId === receiverId) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        }

        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ error: "User not found" });
        }

        // // Check if the sender's ID is already in the receiver's request array
        const existingRequest = receiver.requests.find(request => request.sender_id === senderId);
        if (existingRequest) {
            return res.status(400).json({ error: "Request already exists" });
        }

        // // Add the sender's ID to the receiver's requests array
        receiver.requests.push({ sender_id: senderId, accepted: false });
        await receiver.save();

        res.status(200).json({ message: "Request sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const unfollow=async(req,res)=>{
    try {
        const userId = req.user.userId;
        const following_id = req.params.id;
        console.log('Sender ID data type:', typeof userId);
        console.log('Receiver ID data type:', typeof following_id);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const following = user.following_ids;
        if (!following.includes(following_id)) {
            return res.status(404).json({ error: "User not found" });
        }
        user.following_ids = following.filter(id => id != following_id);
        user.following -= 1;
        await user.save();
        const followingUser = await User.findById(following_id);
        if (!followingUser) {
            return res.status(404).json({ error: "User not found" });
        }
        followingUser.followers_ids = followingUser.followers_ids.filter(id => id != userId);
        followingUser.followers -= 1;
        await followingUser.save();
        res.json({ message: "Unfollowed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getRequests=async(req,res)=>{
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const requests = user.requests;
        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }   
};

const acceptRequest=async(req,res)=>{
    try {
        const userId = req.user.userId;
        const requestId = req.body.requestId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const request = user.requests.id(requestId);
        if (!request) {
            return res.status(404).json({ error: "Request not found" });
        }
        const sender = await User.findById(request.sender_id);
        console.log(sender);
        if (!sender) {
            return res.status(404).json({ error: "Sender not found" });
        }
        sender.following_ids.push(userId);
        sender.following += 1;
        await sender.save();

        request.accepted = true;
        user.followers_ids.push(request.sender_id);
        user.followers += 1;
        await user.save();
        res.json({ message: "Request accepted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }    
};


const rejectRequest=async(req,res)=>{
    try {
        const userId = req.user.userId;
        const requestId = req.body.requestId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.requests.id(requestId).deleteOne();
        await user.save();
        res.json({ message: "Request rejected successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { follow,unfollow,getRequests,acceptRequest,rejectRequest };