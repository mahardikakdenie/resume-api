import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    job: {
        type: String,
        require: true,
    },
    since: {
        type: Date,
        require: true,
    },
    until: {
        type: Date,
        require: false,
    },
    description: {
        type: String,
        require: true,
    }
});

const experience = mongoose.model('Experience', experienceSchema);

export default experience