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
      // this.reload("/");
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/_variables.scss";
.logo {
  width: 600px;
  height: 120px;
}
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
  &:hover {
    cursor: pointer;
    background-color: rgba(21, 20, 26, 0.7);
    color: $red;
  }
}
// Responsive
@media screen and (max-width: 670px) {
  .deconnexion {
    width: auto;
    height: auto;
  }
}

</style>