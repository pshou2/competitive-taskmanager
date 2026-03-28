//import
import { User, IUser } from '../models/User';

// export class UserService {    
//     async getAllUsers(): Promise<IUser[]> {
//         try {
//             const users = await User.find({});
//             return users;
//         } catch (error) {
//             //what is error when we catch error?
//             throw new Error("Failed to query database for getAllUsers()", { cause: error });
//         }
//     }

//     async getUserById(id: string): Promise<IUser | null> {
//         try {
//             const user = await User.findById(id);
//             return user;
//         } catch (error){
//             throw new Error (`Failed to query database for getUserById() : ${id}`, { cause: error });
//         }
//     }
// }

//how do i test out just this file? What should I return? I want to return a list of users, of that interface type probably

export async function getAllUsers(): Promise<IUser[]> {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        //what is error when we catch error?
        throw new Error("Failed to query database for getAllUsers()", { cause: error });
    }

} 

export async function getUserById(id: string): Promise<IUser | null> {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error){
        throw new Error (`Failed to query database for getUserById() : ${id}`, { cause: error });
    }
}


