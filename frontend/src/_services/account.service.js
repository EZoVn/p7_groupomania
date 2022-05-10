import  Axios  from "@/_services/caller.service";


let logout = () => {
  this.$store.commit('logout');
  this.$router.push('/');
};

export const accountService = {
  logout,
}