import { IRepository, IEntity } from '../interfaces';
import * as MongoDb from 'mongodb';


export abstract class MongoRepository<T extends IEntity> implements IRepository<T> {
      
    constructor() {
        
    }
    
    protected abstract getCollectionName(): string;
    
    protected getCollection(): Promise<MongoDb.Collection> {
        return MongoDb.MongoClient.connect("").then((db: MongoDb.Db) => {
            return db.collection(this.getCollectionName());
        });
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

export default 'MongoRepository';
