import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt'
import { createToken } from "../lib/auth.js";


export async function createUserController(req, res) {
    try {
        const saltRounds = 12
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedSaltedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedSaltedPassword
        const userID = crypto.randomUUID();
        req.body.customerId = userID;
        const newUser = new userModel(req.body)
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function loginUserController(req, res) {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        console.log(user)

        if (user) {
            const isMatching = await bcrypt.compare(req.body.password, user.password)
            if (isMatching) {
                const token = await createToken({ customerId: user.customerId, userId: user._id }, { expiresIn: "1h" })
                console.log({ token });
                return res.status(200).cookie("jwt", token, { httpOnly: true }).json({ msg: "Login erfolgreich!" })
            }
            return res.status(401).json({ msg: "Login fehlgeschlagen falsche Eingabe!" })
        }
        return res.status(401).json({ msg: "User nicht gefunden!" })


    } catch (err) {
        res.status(500).json(err)
    }
}
export async function getAllUsersController(req, res) {
    console.log("users", req.user)
    try {
        const allUsers = await userModel.find();
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json(error)
    }
}