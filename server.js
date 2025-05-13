const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const Model = require('./Model')
const app = express()
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

mongoose.connect('mongodb+srv://sreejaosreenivasan:5etPIoWmTfbeSHlK@cluster0.zaliiaj.mongodb.net/models?retryWrites=true&w=majority&appName=Cluster0')
app.use(cors({
  origin: 'https://3dviewer-sand.vercel.app/', 
  methods: ['GET', 'POST'],
  credentials: true
}));
cloudinary.config({
  cloud_name: 'dabphi7ry',
  api_key: '118764387294448',
  api_secret: 'CfDiR36YDxYdyEazy5p9DN80D5I'
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'glb_models',
    resource_type: 'raw', 
    format: async (req, file) => 'glb', 
  },
});

const upload = multer({ storage })

app.post('/upload', upload.single('model'), async (req, res) => {
  try {
    const model = new Model({
      name: req.file.originalname,
      url: req.file.path,
    });

    await model.save();
    res.json(model);
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    res.status(500).send('Upload failed');
  }
});



app.get('/models', async (req, res) => {
  const models = await Model.find()
  res.json(models)
})

app.listen(5000, () => console.log('Server running on port 5000'))
