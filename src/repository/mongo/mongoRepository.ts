import { IRepository, IEntity } from '../interfaces';
import * as Mongoose from 'mongoose';


new Mongoose.Schema()

export default class MongoRepository<T extends IEntity> implements IRepository<T> {
    
    protected _model: Mongoose.Model<Mongoose.Document>;
    
    constructor() {
        //_model =   
    }

    public getAll(): Promise<Array<T>> {
        return Promise.resolve();
    }

    getById(id: string): Promise<T> {
        return Promise.resolve();
    }

    deleteById(id: string): Promise<T> {
        return Promise.resolve();
    }

    update(entity: T): Promise<T> {
        return Promise.resolve();
    }

    create(entity: T): Promise<T> {
        return Promise.resolve();
    }
}
