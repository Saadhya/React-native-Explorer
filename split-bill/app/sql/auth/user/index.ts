import Connection from "../../connection"

export const createUser=async ({name, email, phone, password}:{name:string, email:string, phone:number, password:string})=>{
    try{
    const db = Connection.getConnection()
    }
    catch(error){

    }

}