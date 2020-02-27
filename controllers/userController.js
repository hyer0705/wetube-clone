import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};

export const postJoin = (req, res) => {
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
        // To Do: Register User
        // To Do: Log user In
        res.redirect(routes.home);
    }
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Log In" });
export const postLogin = (req, res) => {
    res.redirect(routes.home);
};

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

