import jwt from 'jsonwebtoken'

const genToken = (id) => {
    const token = jwt.sign({id}, process.env.SECRET_TOKEN, {
        expiresIn: process.env.EXPIRED_TOKEN
    })
    return token
}
const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_TOKEN)
}
export {
    genToken,
    verifyToken,
}