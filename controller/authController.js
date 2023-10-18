const User = require("../models/authmodel");
const jwt = require("jsonwebtoken");


exports.getRegister = async (req, res) => {
    res.render('register');
}
exports.signUp = async (req, res, next) => {
    const newUser = new User({
        email: req.body.mail,
        password: req.body.passsword,
        passwordConfirm: req.body.ConfirmPasssword,
    });
    await newUser.save().then(() => {
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_expiry
        });
        res.status(200).redirect("/add");
    }).catch(err => {
        console.log(err);
    });
}

exports.getLogin = async (req, res) => {
    res.render("login");
}

exports.login = async (req, res, next) => {
    const email = req.body.mail;
    const password = req.body.passsword;
    // console.log(email, password);

    const olduser = await User.findOne({ email: email }).select("+password");
    const checkPass = await olduser.correctPassword(password, olduser.password);
    // console.log(checkPass);
    // console.log(olduser);

    if (olduser || checkPass) {
        const Token = jwt.sign({ id: olduser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_expiry
        });
        res.status(200).redirect("/add");
    }
    else {
        res.redirect("/");
    }
}

exports.protect = async (req, res, next) => {
    //1. Getting Token and check if it exist
    //2. Verification token
    //3. Check if user still exist
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    console.log(err.message);
                    res.redirect("/");
                } else {
                    // console.log(decodedToken);
                    res.locals.id = decodedToken.sub;
                    console.log("in protected");
                    return next();
                }
            });
        } else {
            res.redirect("/");
        }
    } catch (e) {
        console.log(e);
        res.redirect("/");
    }
}