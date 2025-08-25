import jwt from "jsonwebtoken";


export const generateToken = (userId, res) =>{

    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"7d"
    })


    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, //it actually save it form XSS AKA cross site scripting attack
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict", // lax for dev, strict for prod
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}