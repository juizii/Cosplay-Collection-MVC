const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        media: req.body.media,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  editPost: async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.file);
  
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {  
              title: req.body.title,
              image: result.secure_url,
              cloudinaryId: result.public_id,
              media: req.body.media
            },
          }
        );
      } else {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {  
              title: req.body.title,
              media: req.body.media
            },
          }
        );
      }
      console.log("Successfully Edited!");
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
  },
  //   try {
  //     let post = await Post.findById(req.params.id);
  //     if (!post) {
  //       res.redirect("/profile");
  //       return;
  //     }
  //     if (req.file) {
  //       // Delete old image from cloudinary
  //       await cloudinary.uploader.destroy(post.cloudinaryId);
  //       // Upload new image to cloudinary
  //       const result = await cloudinary.uploader.upload(req.file.path);
  //       post.image = result.secure_url;
  //       post.cloudinaryId = result.public_id;
  //     }
  //     post.title = req.body.title;
  //     post.media = req.body.media;
  //     await post.save();
  //     console.log("Post has been updated!");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     console.log(err);
  //     res.redirect("/profile");
  //   }
  // },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
