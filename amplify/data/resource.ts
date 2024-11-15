import { type ClientSchema, a, defineData, defineFunction} from "@aws-amplify/backend";

const userHandler = defineFunction({
    entry: './handler.ts'
})

const schema = a.schema({
    Todo: a
        .model({
            content: a.string(),
        })
        .authorization((allow) => [allow.publicApiKey()]),
    User: a.model({
        name: a.string(),
        PersonalRecommendationFolders: a.hasMany('PersonalRecommendationFolder', 'userId'),
    }).authorization((allow) => [allow.publicApiKey()]),
    PersonalRecommendationFolder: a.model({
        id: a.id(),
        name: a.string().required(),
        userId: a.id().required(),
        user: a.belongsTo('User', 'userId'),
        PersonalRecommendations: a.hasMany('PersonalRecommendation', 'folderId')
    }).authorization((allow) => [allow.publicApiKey()]),

    PersonalRecommendation: a.model({
        id: a.id(),
        name: a.string().required(),
        link: a.string(),
        description: a.string(),
        folderId: a.id().required(),
        folder: a.belongsTo('PersonalRecommendationFolder', 'folderId'),
    }).authorization((allow) =>  [allow.publicApiKey()]),

    FetchUsers: a.query()
        .arguments({
            content: a.string()
        })
        .returns(a.ref('User'))
        .authorization((allow) => [allow.publicApiKey()])
        .handler(a.handler.function(userHandler)),

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