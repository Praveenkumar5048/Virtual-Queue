import jwt from 'jsonwebtoken';

export const authLoginCheck = (req, res, next) => {
    
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return res.status(200).json({ msg: 'Token is valid', token });
    } catch (err) {
        console.log(err);
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};

export const authLogout = (req, res, next) => {
    res.clearCookie('token');
    return res.status(200).json({ msg: 'Logged out successfully' });
};

