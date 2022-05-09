<template>
  <div>

    <div class="card card__profil">
      {{ user.id }}
      <p class="card__profil--pseudo">{{ user.pseudo }}</p>
      <p class="card__profil--description">Email : {{ user.email }}</p>
      <img class="card__profil--img" :src="user.imgUser" alt="Photo de profil" />
    </div>
    <div class="card">
      <p class="card__profil--description">Courte description de l'utilisateur : {{ user.descriptionUser }}</p>
    </div>
    <button class="button btnDelete">Modifier le profil</button>
    <button @click="deleteAccount(user.id)" class="button btnDelete">Supprimer le profil</button>

    <!-- <Post  /> -->
    <Post :posts="postsUser" :getAllPost="getAllPostUser" />
  </div>

</template>


<script >
import axios from 'axios';
import Post from "../components/Post.vue";

let locale = localStorage.getItem('user');
let localeUser = JSON.parse(locale);
let config = {
  headers: {
    'Authorization': 'Bearer ' + localeUser.access_token
  },
  data: { user_id: localeUser.user_id }
};
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
      axios.get(`http://localhost:8080/post/postUser/${localeUser.user_id}`, { headers: { 'Authorization': 'Bearer ' + localeUser.access_token } })
        .then(res => this.postsUser = res.data.data);
    },
    getOneUser() {
      axios.get(`http://localhost:8080/users/${localeUser.user_id}`, { headers: { 'Authorization': 'Bearer ' + localeUser.access_token } })
        .then(res => {
          this.user = res.data.data;
          console.log('this.user : ', this.user);
        });
    },
    deleteAccount(userId) {
      axios.delete(`http://localhost:8080/users/${userId}`, config)
        .then(() => {
          this.$store.commit('logout');
          this.$router.push('/');
          console.log(`Le compte ${userId} a été supprimer !`)
        })

    },
  }
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