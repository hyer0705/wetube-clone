import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        // throw Error('ERROR!!!');
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }
};

export const search = (req, res) => {
    // console.log(req.query);
    const { query: { term: searchingBy } } = req;
    res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) => res.render("upload", { pageTitle: "Video Upload" });

export const postUpload = (req, res) => {
    //To Do: Upload and Save Video
    // const {
    //     body: {
    //         file, title, description
    //     }
    // } = req;

    const { body: {
        file, title, description
    } } = req;

    // 업로드한 비디오의 상세 페이지로 redirect
    res.redirect(routes.videoDetail(891205));
}

export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video" });
