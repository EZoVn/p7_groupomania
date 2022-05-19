<script >
import { RouterLink, RouterView } from "vue-router";

export default {
  name: "App",
};
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
// Variables
@import "@/assets/sass/_variables.scss";
// Font family Roboto et montserrat
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,400;1,700&display=swap");
// reset css
@import "@/assets/reset.css";

* {
  font-family: "roboto", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1,h2{
  font-family: "Montserrat", sans-serif;
}
h1 {
  font-size: 5em;
  font-weight: bold;
  color: $grey;
  text-align: center;
}
textarea {
  resize: none;
}
body {
  background-image: linear-gradient(57deg, $blue 0%, $grey 150%);
  display: flex;

  min-height: 100vh;
  padding: 30px;
}

#app {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

.deconnexion {
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
  &:hover {
    cursor: pointer;
  }
}
.btnDelete {
  padding: 5px;
  width: auto; 
}
.btn {
  display: flex;
  flex-direction: row;
}
.button {
  background: $grey;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 20px;
  border: none;
  width: auto;
  padding: 10px;
  transition:all ease-in-out .4s background-color;

  &:hover {
    cursor: pointer;
    background-color: $red;
    color: $grey;
    transform: scale(1.05);
  }

}
.card {
  width: 800px;
  margin: 10px;
  padding: 10px;
  background-color: $blue;
  color: $grey;
  border-radius: 16px;
  padding: 32px;

  &__profil {
    display: flex;
    align-items: center;
    margin: 10px 0;

    &--img {
      width: 50px;
      height: 50px;
      margin-right: 5px;
      border-radius: 25px;
      object-fit: cover;
    }
  }
  &__post {
    border: 2px solid $red;
  }

  &__text {
    font-family: "montserrat", sans-serif;
    margin-left: 60px;
  }

  &__img {
    width: 100%;
    margin: 10px 0;
    object-fit: cover;
    border: 4px solid black;
    border-radius: 15px;
  }

  &__newPost {
    margin-bottom: 10px;
    width: 97%;
    padding: 10px;
    border-radius: 16px;
  }
}
@media screen and (max-width: 600px) {
  #app{
    padding: 0;
  }
  body{
    padding: 0;
  }
  .card{
    padding: 5px;
  }
  .nav__icon--imgProfil{
    width: 45px;
    height: 45px;
  }
}
@media screen and (max-width: 850px) {
  h1 {
    font-size: 3em;
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
