import {IRepositoryConfig,IServerConfig} from "./interfaces"

 export default class Configurations {
    
     public static get Repository():IRepositoryConfig 
     { 
         return {
             connectionString: "mongodb://localhost/taskdb"
         }
     }
     
     public static get Server():IServerConfig 
     { 
         return {
             port: 3000
         }
     }
}

