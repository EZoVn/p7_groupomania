import axios from 'axios';
// import router from '../router/index.js'

const Axios = axios.create({
    baseURL: 'http://localhost:8080'
});

let locale = localStorage.getItem('user');
let user = JSON.parse(locale);

Axios.interceptors.request.use(request => {
    console.log(request);
    let token = user.access_token;
    if (token) {
        request.headers.Authorization = 'Bearer ' + token;
    }

    return request;
});

// Axios.interceptors.response.use(response => {
//     return response;
// }, error => {
//     console.log(error.response.status);
//     if (error.response.status == 401) {
//         console.log('if error');
//         localStorage.removeItem('user');
//         router.push({ path: '/' });
//     }
// })

export default Axios;