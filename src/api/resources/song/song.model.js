import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate'
const { Schema } = mongoose;
const songSchema = new Schema({
    title: {
        type: String,
        required: [true, 'SOng must have title'],
    },
    url: {
        type: String,
        required: [true, 'Song must have url'],
    },
    rating: {
        type: Number,
        required: [true, 'Song must have rating'],
        default: 0,
        min: 0,
        max: 5,
    }
});

songSchema.plugin(mongoosePaginate);
export default mongoose.model('Song', songSchema);