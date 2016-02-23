export interface IEntity {
    Id: string;
    CreateDate: Date;
    EndDate: Date;
}

export interface IRepository<T extends IEntity> {
    getAll(): Promise<Array<T>>;
    getById(id: string): Promise<T>;
    deleteById(id: string): Promise<T>;
    update(entity: T): Promise<T>;
    create(entity: T): Promise<T>;
}
