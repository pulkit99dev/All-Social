const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {
    let posts = await Post.find({})      // this  will perform this statement first
        .sort('-createdAt')
        .populate('user')   // this is to populate the user i.e. to extract user whole details
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return res.json(200, {
        message: "List of posts",
        posts: posts
    })

}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);

       if(post.user == req.user.id){
        post.remove();

        await Comment.deleteMany({ post: req.params.id });
        return res.json(200,{
            message:'posts and assosciated content is deleted'
        });
       }else{
           return res.json(401,{
               message:'u cannot delete this post'
           });
       }

    }catch(err){
        console.log("******");
        return res.json(500,{
            message:'not able to dlete the post'
        });
    };

}