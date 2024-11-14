import { UserRepository } from '../Domain/Repositories/UserRepository.ts';
import { User } from '../Domain/Models/User.ts';

export class GetUserProfile {
    constructor(private userRepository: UserRepository) {}

    async execute(userId: string): Promise<User | null> {
        return this.userRepository.getUserById(userId);
    }
}
