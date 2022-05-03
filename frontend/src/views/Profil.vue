<template>
  <div>

    <div class="card card__profil">
      <p class="card__profil--pseudo">{{ user.pseudo }}</p>
      <p class="card__profil--description">Email : {{user.email}}</p>
      <img class="card__profil--img" :src="user.imgUser" alt="Photo de profil" />
    </div>
    <div class="card">
      <p class="card__profil--description">Courte description de l'utilisateur : {{ user.descriptionUser }}</p>
    </div>
      <button class="button btnDelete">Modifier le profil</button>
      <button @click="deleteAccount()" class="button btnDelete">Supprimer le profil</button>
      
    <!-- <Post  /> -->
    <Post :posts="postsUser" />
  </div>

</template>


<script >
import { ref } from "vue";
import axios from 'axios';
import Post from "../components/Post.vue";

let locale = localStorage.getItem('user');
let localeUser = JSON.parse(locale);

export default {
  name: 'Profil',
  components: {
    Post,
  },
  data() {
    return {
      user: {},
      postsUser: [],
    }
  },
  created() {
    this.getOneUser();
    this.getAllPostUser();
  },
  methods: {
    getAllPostUser() {
      axios.get(`http://localhost:8080/post/postUser/${localeUser.user_id}`)
        .then(res => this.postsUser = res.data.data);
    },
    getOneUser() {
      axios.get(`http://localhost:8080/users/${localeUser.user_id}`)
        .then(res => {
          this.user = res.data.data;
          console.log(this.user);
        });
    },
    deleteAccount(){
      axios.delete(`http://localhost:8080/users/${localeUser.user_id}`)
        .then(res => console.log(`Le compte de ${user.pseudo} a été supprimer !`,res))
    },
  },

}

</script>

<style lang="scss">
.deconnexion {
  display: block;
}

.card {
  width: auto;

  &__profil {
    display: flex;
    justify-content: space-between;
  }
}
</style>