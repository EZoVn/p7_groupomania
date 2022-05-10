import Axios from "@/_services/caller.service";


let logout = () => {
  this.$store.commit('logout');
  this.$router.push('/');
};

let getLocalStorage = () => {
  let locale = localStorage.getItem('user');
  let user = JSON.parse(locale);
  return user;
}

export const accountService = {
  logout,
  getLocalStorage,
}