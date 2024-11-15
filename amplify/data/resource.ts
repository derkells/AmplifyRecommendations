import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
    Todo: a
        .model({
            content: a.string(),
        })
        .authorization((allow) => [allow.publicApiKey()]),
    User: a
        .model({
            id: a.id(),
            name: a.string(),
            profileImageUrl: a.string(),
            isAuthenticated: a.boolean(),
            PersonalRecommendationFolders: a.hasMany('PersonalRecommendationFolder', 'userId'),
        })
        .authorization((allow) => [allow.publicApiKey()]),
    PersonalRecommendationFolder: a
        .model({
            id: a.id(), // Amplify auto-generates this by default; no need for `folderId`
            name: a.string().required(),
            userId: a.id().required(), // Establish relationship with User
            user: a.belongsTo("User", "userId"),
        })
        .authorization((allow) => [allow.owner()]),
    // Individual recommendations within personal folders
    PersonalRecommendation: a
        .model({
            id: a.id().required(),
            title: a.string().required(),
            description: a.string(), // Optional description field
            personalRecommendationFolderId: a.id().required(), // Required reference for relationship
            personalRecommendationFolder: a.belongsTo("PersonalRecommendationFolder", "personalRecommendationFolderId"),
            userId: a.id().required(),
            user: a.belongsTo("User", "userId"),
        })
        .authorization((allow) => [allow.owner()]),
    // Model to manage following relationships between users
    Following: a
        .model({
            id: a.id().required(),
            followerId: a.id().required(), // Required relationship
            follower: a.belongsTo("User", "followerId"),
            followingId: a.id().required(), // Required relationship
            following: a.belongsTo("User", "followingId"),
        })
        .authorization((allow) => [allow.owner()]),
    // Liked folders containing recommendations from other users
    LikedRecommendationFolder: a
        .model({
            id: a.id().required(),
            name: a.string().required(),
            userId: a.id().required(),
            user: a.belongsTo("User", "userId"),
        })
        .authorization((allow) => [allow.owner()]),
    // Model to represent liked recommendations from other users
    LikedRecommendation: a
        .model({
            id: a.id().required(),
            title: a.string().required(),
            description: a.string(),
            likedRecommendationFolderId: a.id(), // Optional relationship for folder
            likedRecommendationFolder: a.belongsTo("LikedRecommendationFolder", "likedRecommendationFolderId"),
            originalPersonalRecommendationId: a.id().required(), // Required reference to original recommendation
            originalPersonalRecommendation: a.belongsTo("PersonalRecommendation", "originalPersonalRecommendationId"),
            userId: a.id().required(), // Required relationship for the user who liked this recommendation
            user: a.belongsTo("User", "userId"),
        })
        .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "apiKey",
        // API Key is used for a.allow.public() rules
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
});