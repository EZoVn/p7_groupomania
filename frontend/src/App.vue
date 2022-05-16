<script >
import { RouterLink, RouterView } from 'vue-router'

export default {
  name: 'App',
  methods:{
    logout() {
      this.$store.commit('logout');
      this.$router.push('/');
      // this.$router.go('/')
    }
  }
}



</script>

<template>

  <main>
    <img alt="Groupomania logo" class="logo" src="@/assets/images/logo-revisite.png" width="125"
      height="125" />

    <div class="wrapper">

      <button @click="logout()" class="deconnexion">Deconnexion <font-awesome-icon icon="right-from-bracket" /></button>

      <nav>
        
        <RouterLink  to="/"><font-awesome-icon icon="circle-user" /> </RouterLink>
        <RouterLink to="/post"><font-awesome-icon icon="book-open" /></RouterLink>
        <RouterLink  to="/profil"><font-awesome-icon icon="house-chimney-user" /> </RouterLink>

      </nav>
    </div>
    <RouterView />
  </main>

</template>

<style lang="scss">
// Variables
@import "@/assets/sass/_variables.scss";
// Font family Roboto et montserrat
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,400;1,700&display=swap');
// reset css
@import "@/assets/reset.css";

* {
  font-family: 'roboto', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}
textarea{
  resize: none;
}
body {
  background-image: linear-gradient(57deg, $blue 0%, $grey 150%);
  display: flex;

  min-height: 100vh;
  padding: 30px;
}
nav{
  justify-content: space-between;
}
svg{
  padding: 5px;
}
#app {
  max-width: 100%;
  // background-color: $blue;
  margin: 0 auto;
  padding: 2rem;

  // font-weight: normal;
}

.logo {
  width: 600px;
  height: 120px;
}
.deconnexion{
  display: none;
  width: auto;
  position: absolute;
  top: 40px;
  right: 40px;
  font-weight: 800;
  font-size: 16px;
  background-color: $red;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 5px;
  &:hover{
    cursor: pointer;
  }
}


.button {
  background: $blue;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: .4s background-color;

  &:hover {
    cursor: pointer;
    background-color: rgba(21, 20, 26, .7);
    color: $grey;
  }

  &--disabled {
    background: $grey;
    color: #ececec;

    &:hover {
      cursor: not-allowed;
      background: $red;
    }
  }
}
</style>
