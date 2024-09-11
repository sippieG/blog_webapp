import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// get the current directory path where the script is running
const __dirname = dirname(fileURLToPath(import.meta.url)); 

const app = express();
const port = 3000;

// tells Express how to render the template files
app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/views');
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));


let posts = [];

app.get("/", (req, res) => {
  res.render('index', { posts: posts });
});

app.get("/new", (req, res) => {
    res.render('new');
});

app.post("/new", (req, res) => {
    const newPost = {
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/posts/:id', (req, res) => { // :id acts as a placeholder for any value that will appear in the segment of the URL -- url generated in index.ejs
    const postId = req.params.id; // Get the post ID from the URL
    const post = posts[postId];   // Find the post in the posts array
    
    if (post) {
        res.render('post', { post: post }); 
    } else {
        res.status(404).send('Post not found');
    }
}); 

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });