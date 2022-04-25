import { createStore } from 'vuex';
import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

let user = localStorage.getItem('user');
if (!user) {
    user = {
        userId: -1,
        token: '',
    };
} else {
    try {
        user = JSON.parse(user);
        console.log(user.userId);
        instance.defaults.headers.common['Authorization'] = user.token;
    } catch (ex) {
        user = {
            userId: -1,
            token: '',
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
            instance.defaults.headers.common['Authorization'] = user.token;
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        logout: function (state) {
            state.user = {
                userId: -1,
                token: ''
            },
            localStorage.removeItem('user');
        }
    },
    actions: {
        createAccount: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                commit;
                instance.put('/users/signup', userInfos)
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
                        // A retirer cle token dans la console
                        console.log(res.data.access_token);
                        console.log(res.data);
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
        getAllPostUser: ({ commit }) => {
            commit;
            return instance.get('/post')
                .then(res => {
                    console.log(res.data);
                    res.data
                })
                .catch(e => console.error(e));
        }
    }
});

export default store;