import { createStore } from 'vuex';
import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

let user = localStorage.getItem('user');
if (!user) {
    user = {
        userId: -1,
        access_token: '',
    };
} else {
    try {
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] = user.access_token;
    } catch (ex) {
        user = {
            userId: -1,
            access_token: '',
        };
    }
}

const store = createStore({
    state: {
        status: '',
        user: user,
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            instance.defaults.headers.common['Authorization'] = user.access_token;
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
            console.log(user);
        },
        logout: function (state) {
            state.user = {
                userId: -1,
                access_token: ''
            },
                localStorage.removeItem('user');
        }
    },
    actions: {
        createAccount: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            console.log(userInfos);
            return new Promise((resolve, reject) => {
                instance.post('/users/signup', userInfos)
                    .then(res => {
                        commit('setStatus', 'created');
                        resolve(res)
                    })
                    .catch(e => {
                        commit('setStatus', 'error_create');
                        reject(e)
                    });
            });
        },
        login: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('/auth/login', userInfos)
                    .then(res => {
                        commit('setStatus', '');
                        commit('logUser', res.data);
                        resolve(res)
                    })
                    .catch(e => {
                        commit('setStatus', 'error_login');
                        reject(e)
                    });
            });
        },
    }
});

export default store;