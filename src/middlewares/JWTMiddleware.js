import jwt from "jsonwebtoken";

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.sendStatus(401);
    }

    return res.sendStatus(403);
}

export function JwtMiddleware (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(403);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            catchError(err, res);
        }
        req.body = user;
        next();
    })
}