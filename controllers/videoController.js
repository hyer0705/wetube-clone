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

// upload
export const getUpload = (req, res) => res.render("upload", { pageTitle: "Video Upload" });

export const postUpload = async (req, res) => {

    const {
        body: { title, description },
        file: { path }
    } = req;

    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });

    // console.log(newVideo);

    // 업로드한 비디오의 상세 페이지로 redirect
    res.redirect(routes.videoDetail(newVideo.id));
}

// video detail
export const videoDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        // console.log(video);

        res.render("videoDetail", { pageTitle: video.title, video });
    } catch (error) {
        res.redirect(routes.home);
    }
}

// edit video
export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("editVideo", { pageTitle: `Edit ${video.title}`, video })
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
}

export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;

    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
}

// delete video
export const deleteVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        await Video.findByIdAndRemove({ _id: id });
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
}
