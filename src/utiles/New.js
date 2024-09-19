// // api.js
// const apiUrl = 'https://your-api-url.com/api'; // Set your API base URL

// const getAccessToken = () => {
//     return localStorage.getItem('accessToken'); // or wherever you're storing it
// };

// const getRefreshToken = () => {
//     return localStorage.getItem('refreshToken'); // Store your refresh token
// };

// const refreshAccessToken = async () => {
//     const refreshToken = getRefreshToken();

//     if (!refreshToken) {
//         throw new Error('No refresh token available');
//     }

//     const response = await fetch(`${apiUrl}/auth/refresh`, { // Update with your refresh endpoint
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ refreshToken }),
//     });

//     if (!response.ok) {
//         throw new Error('Failed to refresh access token');
//     }

//     const data = await response.json();
//     localStorage.setItem('accessToken', data.accessToken);
//     return data.accessToken;
// };

// export const fetchApi = async (endpoint, options = {}) => {
//     let token = getAccessToken();

//     const headers = {
//         ...options.headers,
//         'Content-Type': 'application/json',
//         ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
//     };

//     let response = await fetch(`${apiUrl}${endpoint}`, {
//         ...options,
//         headers,
//     });

//     // Check if the token has expired (assuming 401 Unauthorized is returned)
//     if (response.status === 401) {
//         try {
//             token = await refreshAccessToken(); // Request a new access token
//             headers['Authorization'] = `Bearer ${token}`; // Update the header with new token

//             // Retry the original request with the new token
//             response = await fetch(`${apiUrl}${endpoint}`, {
//                 ...options,
//                 headers,
//             });
//         } catch (err) {
//             throw new Error('Could not refresh token or make original request');
//         }
//     }

//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }

//     return response.json();
// };
