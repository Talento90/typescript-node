import { IRepository, IEntity } from '../interfaces';

export default class MemoryRepository<T extends IEntity> implements IRepository<T> {

    private db: { [id: string]: T; } = {};
    
    public getAll(): Promise<Array<T>> {
       return new Promise<Array<T>>((resolve, reject) => {
		  resolve(Object.keys(this.db).map(key => this.db[key]));
	   });
    }
   
    public getById(id: string): Promise<T> {
        return Promise.resolve(this.db[id]);
    }

    deleteById(id: string): Promise<T> {
        return Promise.resolve(this.db[id]);
    }

    update(entity: T): Promise<T> {
        this.db[entity.Id] = entity;
        return Promise.resolve(entity);
    }

    create(entity: T): Promise<T> {
        this.db[entity.Id] = entity;
        return Promise.resolve(entity);
    }
}


