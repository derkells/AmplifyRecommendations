import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
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
            PersonalRecommendationFolders: a.hasMany('PersonalRecommendationFolder', 'id'),
        }).authorization((allow) => [allow.publicApiKey()]),

      PersonalRecommendationFolder: a
      .model({
        folderId: a.id().required(),
        name: a.string().required(),
        ownerId: a.id().required(), // Required reference field for relationship
        owner: a.belongsTo("User", "id"),
      })
      .authorization((allow) => [allow.publicApiKey()]),


      // Individual recommendations within personal folders
  // PersonalRecommendation: a
  //     .model({
  //       id: a.id().required(),
  //       title: a.string().required(),
  //       description: a.string(), // Optional description field
  //       folderId: a.id().required(), // Required reference for relationship
  //       folder: a.belongsTo("PersonalRecommendationFolder", "folderId"),
  //       ownerId: a.id().required(),
  //       owner: a.belongsTo("User", "ownerId"),
  //     })
  //     .authorization((allow) => [allow.owner()]),
  //     // Model to manage following relationships between users
  // Following: a
  //     .model({
  //       id: a.id().required(),
  //       followerId: a.id().required(), // Required relationship
  //       follower: a.belongsTo("User", "followerId"),
  //       followingId: a.id().required(), // Required relationship
  //       following: a.belongsTo("User", "followingId"),
  //     })
  //     .authorization((allow) => [allow.owner()]),
  //
  // // Liked folders containing recommendations from other users
  // LikedRecommendationFolder: a
  //     .model({
  //       id: a.id().required(),
  //       name: a.string().required(),
  //       ownerId: a.id().required(),
  //       owner: a.belongsTo("User", "ownerId"),
  //     })
  //     .authorization((allow) => [allow.owner()]),
  //
  // // Model to represent liked recommendations from other users
  // LikedRecommendation: a
  //     .model({
  //       id: a.id().required(),
  //       title: a.string().required(),
  //       description: a.string(),
  //       folderId: a.id(), // Optional relationship for folder
  //       folder: a.belongsTo("LikedRecommendationFolder", "folderId"),
  //       originalRecommendationId: a.id().required(), // Required reference to original recommendation
  //       originalRecommendation: a.belongsTo("PersonalRecommendation", "originalRecommendationId"),
  //       likedByUserId: a.id().required(), // Required relationship for the user who liked this recommendation
  //       likedByUser: a.belongsTo("User", "likedByUserId"),
  //     })
  //     .authorization((allow) => [allow.owner()]),
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

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
//
//
// import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
//
// const schema = a.schema({
//   // User model to represent each app user
//   User: a
//       .model({
//         id: a.id().required(),
//         name: a.string().required(),
//         profileImageUrl: a.string(), // Optional field without .required()
//         isAuthenticated: a.boolean().required(),
//       })
//       .authorization((allow) => [allow.publicApiKey()]),
//
//   // Folder for user's personal recommendations (Movies, Music, etc.)
//   PersonalRecommendationFolder: a
//       .model({
//         id: a.id().required(),
//         name: a.string().required(),
//         ownerId: a.id().required(), // Required reference field for relationship
//         owner: a.belongsTo("User", "ownerId"),
//       })
//       .authorization((allow) => [allow.owner()]),
//
//   // Individual recommendations within personal folders
//   PersonalRecommendation: a
//       .model({
//         id: a.id().required(),
//         title: a.string().required(),
//         description: a.string(), // Optional description field
//         folderId: a.id().required(), // Required reference for relationship
//         folder: a.belongsTo("PersonalRecommendationFolder", "folderId"),
//         ownerId: a.id().required(),
//         owner: a.belongsTo("User", "ownerId"),
//       })
//       .authorization((allow) => [allow.owner()]),
//
//   // Model to manage following relationships between users
//   Following: a
//       .model({
//         id: a.id().required(),
//         followerId: a.id().required(), // Required relationship
//         follower: a.belongsTo("User", "followerId"),
//         followingId: a.id().required(), // Required relationship
//         following: a.belongsTo("User", "followingId"),
//       })
//       .authorization((allow) => [allow.owner()]),
//
//   // Liked folders containing recommendations from other users
//   LikedRecommendationFolder: a
//       .model({
//         id: a.id().required(),
//         name: a.string().required(),
//         ownerId: a.id().required(),
//         owner: a.belongsTo("User", "ownerId"),
//       })
//       .authorization((allow) => [allow.owner()]),
//
//   // Model to represent liked recommendations from other users
//   LikedRecommendation: a
//       .model({
//         id: a.id().required(),
//         title: a.string().required(),
//         description: a.string(),
//         folderId: a.id(), // Optional relationship for folder
//         folder: a.belongsTo("LikedRecommendationFolder", "folderId"),
//         originalRecommendationId: a.id().required(), // Required reference to original recommendation
//         originalRecommendation: a.belongsTo("PersonalRecommendation", "originalRecommendationId"),
//         likedByUserId: a.id().required(), // Required relationship for the user who liked this recommendation
//         likedByUser: a.belongsTo("User", "likedByUserId"),
//       })
//       .authorization((allow) => [allow.owner()]),
// });
//
// export type Schema = ClientSchema<typeof schema>;
//
// export const data = defineData({
//   schema,
//   authorizationModes: {
//     defaultAuthorizationMode: "apiKey",
//     apiKeyAuthorizationMode: {
//       expiresInDays: 30,
//     },
//   },
// });
