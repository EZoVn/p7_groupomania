<script >
import { ref } from "vue";
import axios from 'axios';
import Post from "../components/Post.vue";



let locale = localStorage.getItem('user');
let localeUser = JSON.parse(locale);

export default {
  name: 'Profil',
  data() {

    return {
      user: ref({}),
    }
  },

  async created() {
    // this.user = await axios.get(`http://localhost:8080/users/${localeUser.user_id}`)
    await axios.get(`http://localhost:8080/users/${localeUser.user_id}`)
      .then(res => {
        this.user = res.data;
        console.log(this.user);
      });
  },

}

</script>

<template>
  <div>

    <div class="card">
      <img class="card__profil--img" src="../assets/images/InZooPic.png" alt="Photo de profil" />
      <p class="card__profil--pseudo">{{user.data.pseudo}}</p>
      <button class="button card__profil_modify">Modifier le profil</button>
      <p class="card__profil-description">
        Voila une courte description du profil
      </p>
    </div>
    <!-- post du profil -->
    <!-- <Post /> -->
  </div>

</template>

<style>
.deconnexion {
  display: block;
}

.card {
  width: auto;
}
</style>