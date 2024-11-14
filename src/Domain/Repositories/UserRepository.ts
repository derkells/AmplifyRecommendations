import { User } from "../Models/User.ts";

export interface UserRepository {
    getUserById(id: string): Promise<User | null>;
    searchUsers(query: string): Promise<User[]>;
}
