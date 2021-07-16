const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connected!');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({ 
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [ 
                { 
                    "url" : "https://res.cloudinary.com/ds9oaa7dq/image/upload/v1626385405/YelpCamp/lv5qg2khdf5go9rgkwyg.png", 
                    "filename" : "YelpCamp/lv5qg2khdf5go9rgkwyg" 
                }, 
                { 
                    "url" : "https://res.cloudinary.com/ds9oaa7dq/image/upload/v1626385406/YelpCamp/ux9tf9idekgymxan1lmm.png", 
                    "filename" : "YelpCamp/ux9tf9idekgymxan1lmm" 
                }
            ],
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis, eum? Explicabo rerum vel adipisci labore, dolorem esse accusamus at perspiciatis illum, quas accusantium, ex fuga? Repellendus consectetur eveniet fuga et.',
            author: '60eca4432d27cd1a280eebd5',
            price
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});