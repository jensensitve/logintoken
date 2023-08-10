import { validateToken } from "../lib/auth.js";


export const authMiddleware = async (req, res, next) => {
    const headers = req.headers;
    const authorization = headers.cookie;

    if (!authorization) {
        return res.status(403).json({ msg: "Auth nicht erfolgreich" });
    }
    try {
        const token = authorization.split("=")[1];
        if (!token) {
            return res.status(403).json({ msg: "Auth fehlgeschlagen kein valierder token" })
        }
        req.user = await validateToken(token);
        next()
    } catch (error) {
        return res.status(401).json({ msg: "auth fehlgeschlagen" })
    }
}