import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
    const {
        body: {
            name,
            email,
            password,
            password2
        }
    } = req;
    if (password !== password2) {
        res.status(400); // 잘못된 요청
        res.render("join", { pageTitle: "Join" });
    } else {
        try {
            const user = await User({
                name, email
            });
            await User.register(user, password);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Log In" });
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

// github
export const githubLogin = passport.authenticate("github");
export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: { id, avatar_url: avatarUrl, name, email }
    } = profile;

    try {
        const user = await User.findOne({ email });

        if (user) {
            user.githubId = id;
            user.avatarUrl = avatarUrl;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            name,
            email,
            avatarUrl,
            githubId: id
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};
export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

// facebook
export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = async (accessToken, refreshToken, profile, cb) => {

    const {
        _json: { id, name, email }
    } = profile;

    try {
        const user = await User.findOne({ email });

        if (user) {
            user.facebookId = id;
            user.avatarUrl = `http://graph.facebook.com/${id}/picture?type=large`;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            name,
            email,
            facebookId: id,
            avatarUrl: `http://graph.facebook.com/${id}/picture?type=large`
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }

};

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
}

// user detail
export const getMe = async (req, res) => {
    const user = await User.findById(req.user.id).populate("videos");
    // console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
};

export const userDetail = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const user = await User.findById(id).populate("videos");
        // console.log(user);
        res.render("userDetail", { pageTitle: "User Detail", user });
    } catch (error) {
        res.redirect(routes.home);
    }
};

// export const users = (req, res) => res.send("Users");
export const getEditProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file
    } = req;

    try {
        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        res.redirect(routes.me);
    } catch (error) {
        res.redirect(routes.editProfile);
    }
};

export const getChangePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword1 }
    } = req;

    try {
        if (newPassword !== newPassword1) {
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    } catch (error) {
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
    }
};