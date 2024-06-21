const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.shgmdrc.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db('atg-mern-2').collection('users');
    const postCollection = client.db('atg-mern-2').collection('posts');

    app.get('/users', async (req, res) => {

      const result = [{ user: 'forman', userName: '@forman' }]
      res.send(result);
    })




    // route for user register 
    app.post('/register', async (req, res) => {
      const user = req.body;

      const query = { userName: user.userName }

      const existUer = await userCollection.findOne(query);

      if (existUer) {
        return res.status(401).send({ error: true, message: 'username already used' })
      } else {
        const result = await userCollection.insertOne(user);
        res.send(result);
      }
      console.log('new user', user);
    });


    // route for user login 
    app.post('/login', async (req, res) => {
      const user = req.body;
      const query = { userName: user.userName }

      const loggedUser = await userCollection.findOne(query);
      const status = 'ok'

      if (!loggedUser) {
        return res.status(401).send({ error: true, message: 'user not found' })
      }

      if (loggedUser.password === user.password) {
       return res.send({ status })
      } else {
        return res.status(401).send({ error: true, message: 'wrong password' })
      }
    })

// route for add posts 
    app.post('/post', async (req, res) => {
      const post = req.body
      const result = await postCollection.insertOne(post);
      res.send(result);
    })

    //route for get posts
    app.get('/posts', async (req, res) => {
      const posts = await postCollection.find().sort({ date: -1 }).toArray();
      res.send(posts);
    })



    // route for make comments 
    app.put('/comment', async (req, res) => {
      const comment = req.body;
      const postId = comment.postId;
      console.log(postId)
      const { userName, commentText } = comment;
      const filter = { _id: new ObjectId(postId) };
      const update = { $push: { comments: { userName, commentText } } };
      const options = { upsert: true };
    
      const result = await postCollection.updateOne(filter, update, options);
      res.send(result);
    });


    // route for make like
    app.put('/like', async (req, res) => {
      const liked = req.body;
      const postId = liked.postId;
      const { userName } = liked;
    
      // Check if the user has already liked the post
      const post = await postCollection.findOne({ _id: new ObjectId(postId), 'likes.userName': userName });
    
      if (post) {
        res.send('User has already liked the post' );
      } else {
        const filter = { _id: new ObjectId(postId) };
        const update = { $push: { likes: { userName, liked: true } } };
        const options = { upsert: true };
    
        const result = await postCollection.updateOne(filter, update, options);
        res.send(result);
      }
    });


    app.put('/posts/:id', async (req, res) => {
      const id = req.params.id;
      const post = req.body;
      console.log(post);

      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updatedPost = {
        $set: {
          postText: post.editPost
        }
      }

      const result = await postCollection.updateOne(filter, updatedPost, options);
      res.send(result);

    })

    app.delete('/posts/:id', async (req, res) => {
      const id = req.params.id;
      console.log('please delete from database', id);
      const query = { _id: new ObjectId(id) }
      const result = await postCollection.deleteOne(query);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('SIMPLE CRUD IS RUNNING')
})

app.listen(port, () => {
  console.log(`SIMPLE CRUD is running on port, ${port}`)
})
