const Video = require('../models/video.model');
const util = require('../util');

// Handle index actions
exports.index = function (req, res) {
    return Video.find()
        .then((videos) => {
            return util.createSuccessResponse( res, videos, 200, "Get Videos Successfully");
        })
        .catch( err => {
            return util.createErrorResponse( res, 400, err );
        });
};

// Handle create video actions
exports.new = function (req, res) {
    return Video.findOne({ video_id: req.body.video_id })
        .then((rvideo) => {
            if (!rvideo) {
                var video = new Video();
                video.title = req.body.title;
                video.description = req.body.description;
                video.tags = req.body.tags;
                video.total_views = req.body.total_views;
                video.likes = req.body.likes;
                video.dislikes = req.body.dislikes;
                video.video_id = req.body.video_id;
                video.comment_count = req.body.comment_count;
                video.published_at = req.body.published_at;
                video.duration = req.body.duration;

                return video.save();
            }
            throw 'Video already exists!';
        })
        .then((video) => {
            console.log("New video created!");
            return util.createSuccessResponse(res, video, 200, "Video Created Successfully");
        })
        .catch(err => {
            console.log(err);
            return util.createErrorResponse(res, 400, err);
        });
};

// Handle view video info
exports.view = function (req, res) {
    return Video.findById(req.params.video_id)
        .then((video) => {
            console.log('Video details loading..');
            return util.createSuccessResponse(res, video, 200, "Video details loading...");
        })
        .catch(err => {
            console.log(err);
            return util.createErrorResponse(res, 400, err);
        });
};

// Handle update video info
exports.update = function (req, res) {
    return Video.findById(req.params.video_id)
        .then((video) => {
            video.title = req.body.title;
            video.description = req.body.description;
            video.tags = req.body.tags;
            video.total_views = req.body.total_views;
            video.likes = req.body.likes;
            video.dislikes = req.body.dislikes;
            video.comment_count = req.body.comment_count;
            video.published_at = req.body.published_at;
            video.duration = req.body.duration;

            console.log(req.body);
            return video.save();
        })
        .then((video) => {
            console.log('Video Info updated');
            return util.createSuccessResponse(res, video, 200, "Video Info updated");
        })
        .catch(err => {
            console.log(err);
            return util.createErrorResponse(res, 400, err);
        });
};
// Handle delete video
exports.delete = function (req, res) {
    return Video.remove({ _id: req.params.video_id })
        .then(_id => {
            console.log(_id);
            console.log("Video Deleted");
            return util.createSuccessResponse(res, req.params.video_id, 200, "Video Deleted");
        })
        .catch(err => {
            console.log(err);
            return util.createErrorResponse(res, 400, err);
        });
};