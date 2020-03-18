import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getJoin, logout, postJoin, getLogin, postLogin, githubLogin, postGithubLogin, getMe, facebookLogin, postFacebookLogin } from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

// join
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

// login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);


globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

// github login
globalRouter.get(routes.github, githubLogin);

globalRouter.get(
    routes.githubCallback,
    passport.authenticate("github", { failureRedirect: '/login' }), postGithubLogin
);

globalRouter.get(routes.me, getMe);

// facebook login
globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(routes.facebookCallback, 
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    postFacebookLogin
);

export default globalRouter;