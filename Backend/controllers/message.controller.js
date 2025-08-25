import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js";



export const getUsersForSidebar =async (req,res) => {
    try {
        const loggedUserId = req.user._id;
        const filteredUsers =await User.find({_id: { $ne: loggedUserId } }).select("-password");

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Error in checkAuth controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const getMessages = async (req,res) => {
    try {
        const { id:userToChatId } = req.params
        const myId =req.user._id;

        const message = await Message.find({
            $or: [
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}   
            ]
        })

        res.status(200).json({message})
    } catch (error) {
         console.error("Error in checkAuth controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl = null;

    if (image) {
      // Example Cloudinary upload (make sure cloudinary is configured)
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "chat_images",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // TODO: add socket.io real-time message broadcasting here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage)
    }

    res.status(200).json(newMessage); // ✅ sends data to frontend
  } catch (error) {
    console.error("Error in sendMessages controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
