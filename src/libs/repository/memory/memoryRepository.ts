import {IEntity} from "../../../core/interfaces";
import {IRepository} from "../interfaces";
import * as Moment from "moment";
const UUID = require("node-uuid");


class MemoryRepository<T extends IEntity> implements IRepository<IEntity> {
    protected database: Map<string, T>;

    constructor() {
        this.database = new Map<string, T>();
    }

    public findById(id: string): Promise<T> {
        return Promise.resolve(this.database.get(id));
    }

    public findByIdAndDelete(id: string): Promise<T> {
        var deletedEntity = this.database.get(id);
        this.database.delete(id);
        return Promise.resolve(deletedEntity);
    }

    public findByIdAndUpdate(id: string, entity: T): Promise<T> {
        var entityToUpdate = this.database.get(id);

        if (entityToUpdate !== undefined) {
            this.database.delete(id);
            entity.updatedDate = Moment.utc().toDate();
            this.database.set(id, entity);
            return Promise.resolve(entity);
        }

        return Promise.resolve(undefined);
    }

    public find(filter: Object, top?: number, skip?: number): Promise<Array<T>> {
        var values = new Array<T>();

        this.database.forEach((value) => {
            values.push(value);
        });

        return Promise.resolve(values);
    }

    public create(entity: T): Promise<T> {
        entity._id = UUID.v4();
        entity.createdDate = Moment.utc().toDate();
        this.database.set(entity._id, entity);
        return Promise.resolve(entity);
    }
}

export default MemoryRepository;