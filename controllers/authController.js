const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

// try to use prisma validator next
const Validator = require('fastest-validator');
const v = new Validator();

class AuthController {
    static async login(req, res){
        try {
            // validate
            const schema = {
                username: 'string',
                password: 'string',
            }
            const validate = v.validate(req.body, schema);
            if(validate.length){
                return res.status(400).json({
                    message: 'Bad Request',
                    errors: validate
                });
            }
        
            const user = await prisma.user.findUnique({
                where: {
                  username: req.body.username,
                },
              })
            if(user && (await bcrypt.compare(req.body.password, user.password))){
                const token = jwt.sign({
                    id: user.id,
                    username: user.username
                }, process.env.TOKEN_SECRET);
                res.status(200).json({token: token});
            }else{
                res.status(401).json({message: 'Unauthorized !'});
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    static async register(req, res){
        try {
            // validate
            const schema = {
                username: 'string',
                password: 'string',
            }
            const validate = v.validate(req.body, schema);
            if(validate.length){
                return res.status(400).json({
                    message: 'Bad Request',
                    errors: validate
                });
            }

            const encryptedPassword = await bcrypt.hash(req.body.password, 10);
            await prisma.user.create({
                data: {
                    username: req.body.username,
                    password: encryptedPassword,
                }
            });

            res.status(200).json({
                message: 'Success',
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
}

module.exports = AuthController