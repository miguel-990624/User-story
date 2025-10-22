import { type Response, type Request } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from '../models/users.models.ts';
import "dotenv/config"; 

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

const register = async ( req:Request, res:Response ) => {
    try{
        const { name, email, password, role } = req.body;

        if ( !name || !email || !password ) {
            return res.status(400).json({ error: "Name, Email and Password are required"});
        };

        const exists = await User.findOne({where:{email}});
        if ( exists ) {
            return res.status(409).json({error: "Email already on file"});
        };

        const hashedPassword = await bcrypt.hash(password,SALT_ROUNDS);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role ?? "analyst"
        });

        const { password: _, ...safeUser } = user.get({plain:true});

        return res.status(201).json({
            message: "User registered succesfully",
            user: safeUser
        });
    } catch ( error ) {
        console.error("Register Error: ", error);
        return res.status(500).json({error: "Internal error during registration"});
    };
};

const login = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body;

        if ( !email || !password ) {
            return res.status(400).json({ error: "Email and Password are required"});
        };

        const user = await User.findOne({
            where: {email},
            attributes: ["id", "name", "email", "password", "role"]
        });

        if ( !user ) {
            return res.status(401).json({error: "Invalid credentials"});
        };

        const valid = await bcrypt.compare( password, user.password);

        if ( !valid ) {
            return res.status(401).json({error:"Invalid credentials"});
        };

        const accessToken = jwt.sign(
            { sub:user.id, email:user.email, role:user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            { sub:user.id, email:user.email, role:user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        const { password: _, ...safeUser } = user.get({ plain:true });

        return res.json({
            message: "Login Succesful",
            user: safeUser,
            accessToken,
            refreshToken
        });
    } catch ( error ) {
        console.error("Login Error: ", error);
        return res.status(500).json({error:"Internal error during login"});
    };
};

export { register, login }; 