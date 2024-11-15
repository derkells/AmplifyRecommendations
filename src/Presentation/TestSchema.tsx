import  { useState } from "react";
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource.ts';

function TestSchema() {
 const [content, setContent] = useState(''); // State for input value
 //const [data, setData] = useState(null); // State for query results
 //const [error, setError] = useState(null); // Explicitly allow any type for errors

 // Generate the client to use for querying
 const client = generateClient<Schema>();

 const handleFetchUsers = async () => {
  // try {
  //  const { data, errors } = await client.queries.FetchUsers({ content });
  //  if (errors) {
  //   console.error('Errors:', errors);
  //   //@ts-ignore
  //   setError(errors); // Errors are now typed as `any`
  //  } else {
  //   console.log('Data:', data);
  //   //@ts-ignore
  //   setData(data);
  //  }
  // } catch (err) {
  //  console.error('Error fetching users:', err);
  //  //@ts-ignore
  //  setError(err); // Catches unexpected errors
  // }
  const { data: users } = await client.models.User.list();
  console.log('data', users)
 };


 return (
     <div>
      <h1>Fetch Users</h1>
      <div>
       <label htmlFor="contentInput">Content:</label>
       <input
           id="contentInput"
           type="text"
           value={content}
           onChange={(e) => setContent(e.target.value)}
           placeholder="Enter content here"
       />
       <button onClick={handleFetchUsers}>Fetch Users</button>
      </div>
      {/*{data && (*/}
      {/*    <div>*/}
      {/*     <h2>Result:</h2>*/}
      {/*     <pre>{JSON.stringify(data, null, 2)}</pre>*/}
      {/*    </div>*/}
      {/*)}*/}
      {/*{error && (*/}
      {/*    <div>*/}
      {/*     <h2>Error:</h2>*/}
      {/*     <pre style={{ color: 'red' }}>{JSON.stringify(error, null, 2)}</pre>*/}
      {/*    </div>*/}
      {/*)}*/}
     </div>
 );
}

export default TestSchema;