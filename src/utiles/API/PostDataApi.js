import { useState, useEffect } from 'react';
import axios from 'axios';

const PostDataApi = (url, postData) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const postDataRequest = async () => {
            try {
                const response = await axios.post(url, postData);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (postData) {
            postDataRequest();
        }
    }, [url, postData]);

    return { data, isLoading, error };
};

export default PostDataApi;


// // ExampleComponent.js
// import React, { useState } from 'react';
// import postRequest from './api'; // Adjust the import path as needed

// const ExampleComponent = () => {
//   const [data, setData] = useState({}); // Your data state
//   const [error, setError] = useState(null);

//   const handleSubmit = async () => {
//     try {
//       const responseData = await postRequest('https://api.example.com/endpoint', data);
//       console.log('Response:', responseData);
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h1>Submit Data</h1>
//       {/* Your form inputs to update data */}
//       <button onClick={handleSubmit}>Submit</button>
//       {error && <p>Error: {error}</p>}
//     </div>
//   );
// };

// export default ExampleComponent;
