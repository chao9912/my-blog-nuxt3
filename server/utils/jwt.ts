import jwt from 'jsonwebtoken'

const SECRET = 'blog-secret-key'

export const createToken = (data: any) => {
    return jwt.sign(data, SECRET, {
        expiresIn: '7d'
    })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET)
}