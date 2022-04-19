<script setup>
import Post from "../components/Post.vue";

const getAllPost = function () {
      console.log(this.$store.state.user);
    }
</script>

<template>
  <div>
<button @click="getAllPost">clique</button>

    <div class="card">
      <img
        class="card__profil--img" src="../assets/images/InZooPic.png" alt="Photo de profil" />
      <button class="button card__profil_modify">Modifier le profil</button>
      <p class="card__profil--pseudo">@Vince</p>
      <p class="card__profil-description">
        Voila une courte description du profil
      </p>
    </div>
    <!-- post du profil -->
    <!-- <Post /> -->
  </div>
  
</template>

<style>
.card{
  width:100%;
}
</style>