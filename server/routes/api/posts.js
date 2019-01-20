const express=require('express');
const mongodb=require('mongodb');

const router= express.Router();

//Get posts
router.get('/', async (req, res)=>{
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

//Add posts
router.post('/', async(req, res)=>{
    const posts=await loadPostCollection();
    await posts.insertOne({
        name:req.body.name,
        title:req.body.title,
        text:req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

//Get one post
router.get('/:id', async (req, res)=>{
    const posts = await loadPostCollection();
    res.send(await posts.findOne({_id: new mongodb.ObjectID(req.params.id)}));
});

//Update post
router.put('/:id', async(req, res)=>{
    const posts=await loadPostCollection();
    await posts.findOneAndUpdate({
        _id: new mongodb.ObjectID(req.params.id)},{
            $set:{
                name:req.body.name,
                title:req.body.title,
                text:req.body.text,
                createdAt: new Date()
            }
        },
        (err, result) => {
            if (err) return res.send(err)
            res.send(result)
          }
 
    )
    
})

//Delete posts
router.delete('/:id', async (req, res)=>{
    const posts=await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();

})

//Connect to post collection
async function loadPostCollection(){
    const client=await mongodb.MongoClient.connect('mongodb://user:vueexpress1@ds113923.mlab.com:13923/vue_express', {
        useNewUrlParser:true
    });

    return client.db('vue_express').collection('posts');
}

module.exports=router;