import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import { LoginUser } from "../../Application/UseCases/LoginUser";
//import { AuthRepositoryImpl } from "../../Infrastructure/AuthRepositoryImpl.ts";
import "./Login.css";
import { generateClient } from "aws-amplify/data";
import type {Schema} from '../../amplify/data/resource.ts'

const client = generateClient<Schema>();

async function fetchData() {
    try {
        // Fetch all users
        const { data: users, errors: userErrors } = await client.models.User.list();
        if (userErrors) {
            console.error("Error fetching users:", userErrors);
            return;
        }

        for (const user of users) {
            // Fetch folders for the current user
            const { data: folders, errors: folderErrors } = await client.models.PersonalRecommendationFolder.list({
                filter: { userId: { eq: user.id } }, // Filter by userId
            });

            if (folderErrors) {
                console.error(`Error fetching folders for user ${user.id}:`, folderErrors);
                continue;
            }

            console.log(`User: ${user.name}`);
            console.log("Folders:");
            folders.forEach((folder) => {
                console.log(` - ${folder.name}`);
            });
        }
    } catch (error) {
        console.error("Error while fetching data:", error);
    }
}


// async function fetchFolders(){
//     const { data: folders, errors: userErrors } = await client.models.PersonalRecommendationFolder.list();
//     if (userErrors){
//         console.log('Error Fetching Folders', userErrors);
//         return
//     }
//     console.log("Fetched Folder Data", folders)
// }

// async function createUser() {
//     try {
//         // Create a new user
//         const userPayload = { name: "Test User" };
//         const { data: newUser, errors: userErrors } = await client.models.User.create(userPayload);
//
//         if (userErrors) {
//             console.error("Error creating user:", userErrors);
//             return null;
//         }
//         console.log("Created user:", newUser);
//         return newUser; // Return the created user for further use
//     } catch (error) {
//         console.error("Error while creating user:", error);
//         return null;
//     }
// }

async function createFolder() {
    try {
        // Create a Personal Recommendation Folder for the user
        const folderPayload = {
            name: "Movies",
            userId: 'afafa6e9-349f-448f-802b-4c107faf5ba8', // Link the folder to the user
        };

        const { data: newFolder, errors: folderErrors } = await client.models.PersonalRecommendationFolder.create(folderPayload);

        if (folderErrors) {
            console.error("Error creating folder:", folderErrors);
            return;
        }
        console.log("Created folder:", newFolder);
    } catch (error) {
        console.error("Error while creating folder:", error);
    }
}

// async function handleCreateData() {
//     const newUser = await createUser();
//     if (newUser && newUser.id) {
//         await createFolder();
//     } else {
//         console.error("User creation failed, folder creation skipped.");
//     }
// }
//


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const [error, setError] = useState("");

    useEffect(() => {
        // Placeholder for additional initialization logic, if needed
    }, []);


    return (
        <main className="login-container">
            <div className="login-box">
                <h1 className="app-name">Recme</h1>
                <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={fetchData} className="login-btn">
                    Login
                </button>
                {/* No need for error handling here since we're testing data fetching */}
                <div className="divider">--- Or ---</div>
                <button onClick={createFolder} className="create-account-btn">Create Account</button>
            </div>
        </main>
    );
}

export default Login;
