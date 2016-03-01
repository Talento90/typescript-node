import * as Mongoose from 'mongoose';
import {ITask} from '../interfaces';

var schema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
        versionKey: '_version',
        timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
    });

export default Mongoose.model<ITask>("Tasks");
