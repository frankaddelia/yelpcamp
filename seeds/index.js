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
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({ 
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [ 
                { 
                    "url" : "https://res.cloudinary.com/ds9oaa7dq/image/upload/v1626482679/YelpCamp/jgpmfw8ybardq55jooid.png", 
                    "filename" : "YelpCamp/jgpmfw8ybardq55jooid" 
                }, 
                { 
                    "url" : "https://res.cloudinary.com/ds9oaa7dq/image/upload/v1626402129/YelpCamp/d4xluxranymh4hqcya7u.png", 
                    "filename" : "YelpCamp/d4xluxranymh4hqcya7u" 
                }
            ],
            geometry: { 
                type: 'Point',
                coordinates: [ cities[random1000].longitude, cities[random1000].latitude ]
            },
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