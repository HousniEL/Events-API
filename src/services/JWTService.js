import jwt from "jsonwebtoken";

export function getAccessToken(utilisateur){
    return jwt.sign(utilisateur, process.env.ACCESS_TOKEN_SECRET);
}