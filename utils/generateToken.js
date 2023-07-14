import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '2h',
    });

    res.cookie('jwt', token, {
        // httpOnly: false,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        // sameSite: 'strict', // Prevent CSRF attacks
        // maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: false,
        // signed: true,
        sameSite: 'lax',
        maxAge: 1 * 2 * 60 * 60 * 1000, // 30 days
    });
};

export default generateToken;