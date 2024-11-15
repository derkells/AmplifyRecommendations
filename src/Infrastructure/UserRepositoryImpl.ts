import { User } from "../Domain/Models/User.ts"
import { UserRepository } from "../Domain/Repositories/UserRepository";

export class UserRepositoryImpl implements UserRepository {
    async getUserById(id: string): Promise<User | null> {
        // Here you would implement the logic to fetch a user by ID, for example, from an API or database.
        // Returning a mock user for simplicity
        return { id, name: ""};
    }

    async searchUsers(query: string): Promise<User[]> {
        // Implement the search logic
        console.log(query);
        return [];
    }
}
