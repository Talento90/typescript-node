/// <reference path="./typings/index.d.ts" />

// * 2. To use native ES6 promises, add this line to your main .d.ts file:
// *    type MongoosePromise<T> = Promise<T>;
type MongoosePromise<T> = Promise<T>;

//Mockoose Typings
declare module "mockgoose" {
    function mockgoose(db: any, options?: any): any;
    module mockgoose {
    }
    export = mockgoose;
}