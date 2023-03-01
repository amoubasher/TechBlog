
const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new comment
// This should be a protected route, so you'll need to use the withAuth middleware

router.post("/", withAuth, async (req, res) => {
    try{
        await Comment.create({
            body: req.body.body,
            postID: req.body.postID,
            userID: req.session.userID
        }).then ((commentData) => {
            res.json(commentData);
        });
        res.redirect("/dashboard");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

