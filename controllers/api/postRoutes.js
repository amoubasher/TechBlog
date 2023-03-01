
const router = require('express').Router();
const { Post, User, Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new post
// This should be a protected route, so you'll need to use the withAuth middleware
router.post("/", withAuth, async (req, res) => {
    const body = req.body;
    try {
        await Post.create({
            title: body.title,
            body: body.body,
            user_id: req.session.user_id
        });
        res.redirect('/dashboard');
    } catch(err) {
        res.status(500).json(err);
    }
});
// TODO - create a PUT route for updating a post's title or body
// This should be a protected route, so you'll need to use the withAuth middleware

router.put("/:id", withAuth, async (req,res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            body: req.body.body
        }, {
            where: {
                id: req.params.id
            }
        })
        (!postData) ? res.status(404).json({message: "no post found!"}) : res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// TODO - create a DELETE route for deleting a post with a specific id
// This should be a protected route, so you'll need to use the withAuth middleware

router.delete("/delete/:id", withAuth, async(req, res) => {
    try{
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        (!postData) ? res.status(404).json({message: "no post found!"}) : res.status(200).json(postData);
        res.redirect("/dashboard");
    } catch(err) { 
        res.status(500).json(err);
    }
})

module.exports = router;
