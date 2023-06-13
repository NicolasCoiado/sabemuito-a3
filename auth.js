import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.SECRET;

function verificaJWT(req, res, next) {
    const token = req.body.token;
    jwt.verify(token, SECRET, (error, decoder ) => {
        if(error){
            res.status(401).end();
        } else {
            next();
        }
    })
}

export default verificaJWT;