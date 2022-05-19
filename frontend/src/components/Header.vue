<template>
  <div>
    <main>
      <img alt="Groupomania logo" class="logo" src="@/assets/images/logo-revisite.png" width="125" height="125" />

      <div class="wrapper">
        <button @click="logout()" class="button deconnexion"><font-awesome-icon class="nav__icon--deco" icon="right-from-bracket" /></button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
    name:'Header',
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
      this.$toast.info("Vous êtes déconnecter !")
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/_variables.scss";
.logo {
  width: 500px;
  height: 100px;}
.deconnexion{
  display: none;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 10px;
  right: 35px;
  font-size: 20px;
  border-radius: 25px;
  padding: 5px;
  transition: all ease-out .5s;
  &:hover {
    cursor: pointer;
    background-color: rgba(21, 20, 26, 0.7);
    color: $red;
    transform: scale(1.3);
  }
}
// Responsive
@media screen and (max-width: 670px) {
  .deconnexion {
    width: auto;
    height: auto;
  }
}
@media screen and (max-width: 440px) {
  h1 {
    font-size: 1.2em;
  }
  .logo {
    width: 200px;
    height: 40px;
  }
}
</style>