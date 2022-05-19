import axios from 'axios';
import router from '@/router'

const Axios = axios.create({
    baseURL: 'http://localhost:8080'
});

let locale = localStorage.getItem('user');
let user = JSON.parse(locale);

Axios.interceptors.request.use(request => {
    let token = user.access_token;
    if (token) {
        request.headers.Authorization = 'Bearer ' + token;
    }

    return request;
});

Axios.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error.response.status);
    if (error.response.status == 401) {
        localStorage.removeItem('user');
        router.push('/');
    }
    if (error.response.status == 409) {
        this.$toast.error('email deja utilisé')
    }
})

export default Axios;