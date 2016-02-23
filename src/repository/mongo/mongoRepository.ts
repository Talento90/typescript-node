import { IRepository, IEntity } from '../interfaces';

export default class MongoRepository<T extends IEntity> implements IRepository<T> {

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
