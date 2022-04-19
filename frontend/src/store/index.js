import { createStore } from 'vuex';
import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

const store = createStore({
    state: {
        status: '',
        user: {
            user_id: -1,
            token: '',
        },
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function(state, user) {
            state.user = user;
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
        getAllPost: () => {
            return instance.get('/post/')
                .then(res => {
                    res.data
                    console.log(res.data);
                })
                .catch(e => console.error(e));
        }
    }
});

export default store;