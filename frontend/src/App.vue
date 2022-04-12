<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Groupomania logo" class="logo" src="@/assets/images/icon-left-font-monochrome-white.png" width="125" height="125" />

    <div class="wrapper">

      <nav>

        <RouterLink to="/">Log</RouterLink>
        <RouterLink to="/post">Tous les posts</RouterLink>
      </nav>
    </div>
  <RouterView />
  </header>

</template>

<style lang="scss">
// variable color
$blue: #192946;
$red: #d1515a;
$grey: #b8b8b9;
// Font family Roboto et montserrat
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,400;1,700&display=swap');
// reset css
@import "@/assets/reset.css";

*{
  // roboto pour les titres
  font-family: 'roboto', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  // montserrat pour les textes
  // font-family: 'montserrat', sans-serif;
}

body{
  background-image: linear-gradient(45deg, $blue 0%, $grey 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 30px;
}
#app {
  max-width: 100%;
  // background-color: $blue;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

.logo {
  width: 200px;
  height: 200px;
}

.card {
  max-width: 100%;
  width: 540px;
  background: white;
  border-radius: 16px;
  padding: 32px;

  &__title {
    text-align: center;
    font-weight: 800;
  }

  &__subtitle {
    text-align: center;
    color: #666;
    font-weight: 500;
  }

  &__action {
    color: #2196F3;
    text-decoration: underline;

    &:hover {
      cursor: pointer;
    }
  }
}

.button{
  background: $blue;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
    &:hover {
    cursor:pointer;
    background-color: rgba(21, 20, 26, .7);
    color: $grey;
  }
  &--disabled {
    background:$grey;
    color:#ececec;
    &:hover {
    cursor:not-allowed;
    background:$red;
  }
  }
}




</style>
