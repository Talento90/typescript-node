import * as MongoDb from 'mongodb'
import {IEntity, IRepository} from "../interfaces"


abstract class MongoRepository<T extends IEntity> implements IRepository<IEntity>  {

    protected collection: Promise<MongoDb.Collection>;

    constructor() {
        this.collection = this.getCollection("mongodb://localhost/typescript");
    }

    protected abstract getCollectionName(): string;

    private getCollection(url: string): Promise<MongoDb.Collection> {
        return MongoDb.MongoClient.connect(url).then((db: MongoDb.Db) => {
            return db.collection(this.getCollectionName());
        });
    }

    public findById(id: string): Promise<T> {
        return this.collection.then((collection: MongoDb.Collection) => {
            return collection.find({ _id: id }).toArray().then((results) => {
                return results.length > 0 ? results[0] : undefined;
            });
        });
    }

    public findByIdAndDelete(id: string): Promise<any> {
        return this.collection.then((collection: MongoDb.Collection) => {
            return collection.deleteOne({ _id: id }).then((result) => {
                return result;
            });
        });
    }

    public findByIdAndUpdate(id: string, entity: T): Promise<T> {
        return this.collection.then((collection: MongoDb.Collection) => {
            entity.updatedAt = new Date();
            return collection.updateOne({ _id: id }, entity).then((result) => {
                return entity;
            });
        });
    }

    public find(filter: Object, top?: number, skip?: number): Promise<Array<T>> {
        return this.collection.then((collection: MongoDb.Collection) => {
            return collection.find(filter).limit(top).skip(skip).toArray();
        });
    }

    public create(entity: T): Promise<T> {
        return this.collection.then((collection: MongoDb.Collection) => {
            entity.createdDate = new Date();
            return collection.insertOne(entity).then((result) => {
                return entity;
            });
        });
    }
}

export default MongoRepository;