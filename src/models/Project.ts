import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    media: {
        thumbnail: {
            url: {
                type: String,
                require: true,
            },
        },
        other: [
            {
                url: {
                    type: String,
                    require: false,
                }
            }
        ]
    },
    information :{
        contributors: [
            {
                name: {
                    type: String,
                    require: true,
                },
                profile: {
                    social_media: [
                        {
                            key: {
                                type: String,
                                require: false,
                            },
                            username: {
                                type: String,
                                require: false,
                            },
                            link: {
                                type: String,
                                require: false,
                            }
                        }
                    ]
                }
            }
        ],
    },
    is_deleted: {
        type: Date,
        require: false,
    }
}, { timestamps: true });

const project = mongoose.model('Project', projectSchema);

export default project;