const express = require('express');
const app = express();
const path = require('path');
const posts = require('./posts'); 
const multer = require('multer'); 
const fs = require('fs');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // Save images in 'public/uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      uniqueSuffix + path.extname(file.originalname).toLowerCase()
    ); // Generate a unique filename
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    // Allow only image files
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

// Home route - display all posts
app.get('/', (req, res) => {
  res.render('index', { posts, category: undefined });
});

// Display posts by category
app.get('/category/:category', (req, res) => {
  const category = req.params.category;
  const filteredPosts = posts.filter((p) => p.category === category);
  res.render('index', { posts: filteredPosts, category });
});

// New post form
app.get('/new', (req, res) => {
  res.render('new');
});

// Create new post
app.post('/new', (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err) {
      // Handle Multer errors
      return res.status(400).send(err.message);
    }
    const { title, content, category } = req.body;
    const id = Date.now();
    const createdAt = new Date();
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    posts.push({ id, title, content, category, createdAt, image });
    res.redirect('/');
  });
});

// View single post
app.get('/post/:id', (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.render('post', { post });
});

// Edit post form
app.get('/edit/:id', (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.render('edit', { post });
});

// Update post
app.post('/edit/:id', (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err) {
      // Handle Multer errors
      return res.status(400).send(err.message);
    }
    const post = posts.find((p) => p.id == req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    const { title, content, category } = req.body;
    post.title = title;
    post.content = content;
    post.category = category;
    post.updatedAt = new Date();

    if (req.file) {
      // Delete the old image file if it exists
      if (post.image) {
        const oldImagePath = path.join(__dirname, 'public', post.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error(err);
        });
      }
      post.image = `/uploads/${req.file.filename}`;
    }
    res.redirect('/');
  });
});

// Delete post
app.post('/delete/:id', (req, res) => {
  const index = posts.findIndex((p) => p.id == req.params.id);
  if (index !== -1) {
    // Delete the image file if it exists
    if (posts[index].image) {
      const imagePath = path.join(__dirname, 'public', posts[index].image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error(err);
      });
    }
    posts.splice(index, 1);
  }
  res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
