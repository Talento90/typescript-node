import {IEntity, IRepository} from "../interfaces";
const UUID = require("node-uuid");


class MemoryRepository<T extends IEntity> implements IRepository<IEntity> {
    protected database: {[id: string]: T} = {};

    public findById(id: string): Promise<T> {
        return Promise.resolve(this.database[id]);
    }

    public findByIdAndDelete(id: string): Promise<T> {
        var deletedEntity = this.database[id];
        delete this.database[id];
        return Promise.resolve(deletedEntity);
    }

    public findByIdAndUpdate(id: string, entity: T): Promise<T> {
        if (this.database[id]) {
            entity.updatedAt = new Date();
            this.database[id] = entity;
        }

        return Promise.resolve(this.database[id]);
    }

    public find(filter: Object, top?: number, skip?: number): Promise<Array<T>> {
        var values = Object.keys(this.database).map(key => this.database[key]);
        values = values.slice(skip, skip + top);
        return Promise.resolve(values);
    }

    public create(entity: T): Promise<T> {
        entity._id = UUID.v4();
        this.database[entity._id] = entity;
        return Promise.resolve(entity);
    }
}

export default MemoryRepository;