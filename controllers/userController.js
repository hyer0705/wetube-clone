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

export const logout = (req, res) => {
    // TO DO: Process Log Out
    // 로그아웃을 한 번더 확인하는 페이지를 만들 수 있음( logout.pug 실행)
    // res.render("logout", { pageTitle: "Log Out" });
    res.redirect(routes.home);
}
// export const users = (req, res) => res.send("Users");
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });
export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Detail" });

