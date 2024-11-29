// import axios from 'axios';

// const axiosApiInstance = axios.create({
//     baseURL: 'http://localhost:8000/api/v1/',
// });

// // Function to retrieve tokens
// const getAccessToken = () => localStorage.getItem('accessToken');
// const getRefreshToken = () => localStorage.getItem('refreshToken');

// // Request interceptor
// axiosApiInstance.interceptors.request.use(
//     (config) => {
//         const accessToken = getAccessToken();
//         if (accessToken) {
//             config.headers['Authorization'] = `Bearer ${accessToken}`;
//         }
//         config.headers['Content-Type'] = 'application/json';
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Response interceptor
// axiosApiInstance.interceptors.response.use(
//     (response) => {
//         const refreshToken = response.headers['refresh-token'];
//         if (refreshToken) {
//             localStorage.setItem('accessToken', refreshToken);
//         }
//         return response;
//     },
//     async (error) => {
//         if (error.response.status === 401) {
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('refreshToken');
//             // Optionally redirect to login
//             window.location.reload();
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosApiInstance;
