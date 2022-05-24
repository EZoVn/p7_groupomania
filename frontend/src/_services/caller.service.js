import axios from 'axios';
import router from '@/router'
import { accountService } from "../_services/account.service";

const Axios = axios.create({
    baseURL: 'http://localhost:8080'
});

Axios.interceptors.request.use(request => {
    let user = accountService.getLocalStorage();
    let token = user.access_token;
    if (token) {
        request.headers.Authorization = 'Bearer ' + token;
    }
    return request;
});

Axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status == 401) {
        localStorage.removeItem('user');
        router.push('/');
    }
    if (error.response.status == 409) {
        this.$toast.error('email deja utilisé')
    }
})

export default Axios;