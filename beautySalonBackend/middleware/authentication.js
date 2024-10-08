import jwt from 'jsonwebtoken'
import Apierror from '../utility/Apierror.js';
import { User } from '../model/user.model.js';
import asyncfunhandler from '../utility/asyncFunction.js';

const authenticate = asyncfunhandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new Apierror('You are not login, Fist login', 401));
    }
    const decodeData = jwt.verify(token, process.env.SECRET_TOKEN)

    const user = await User.findById(decodeData.id)
    if (!user) {
        return next(new Apierror('user is no loger exist or invalid user', 401))
    }
    req.user = user
    next();
})

export default authenticate