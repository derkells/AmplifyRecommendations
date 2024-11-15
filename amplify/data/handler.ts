import type { Schema } from './resource.ts'

console.log('Made it')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: Schema["FetchUsers"]["functionHandler"] = async (event, context) => {
    return {
        name: `User : ${event.arguments.content}`, // Assuming "name" is derived from `content`
        id: event.arguments.content?.toString() ?? "Empty", // Generate or fetch a unique ID
        createdAt: new Date().toISOString(), // Provide the current timestamp
        updatedAt: new Date().toISOString() // Assume it's just been updated
    };
};