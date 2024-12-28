const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: 
        "https://unsplash.com/photos/architectural-photography-of-concrete-building-WYLuNY5JG4E",
        set: (v) =>  v === "" ? "https://unsplash.com/photos/a-waterfall-in-the-middle-of-a-lush-green-forest-J6Fdqeb0Vcs" :v,
            },
        
    
    price: Number,
    location: String,
    country: String,
});
const Place = mongoose.model("Place", placeSchema);
module.exports = Place;