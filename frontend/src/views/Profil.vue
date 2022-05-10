<template>
  <div>

    <div class="card card__profil">
      {{ user.id }}
      <p class="card__profil--pseudo">{{ user.pseudo }}</p>
      <p class="card__profil--description">Email : {{ user.email }}</p>

      <img class="card__profil--img" :src="user.imgUser" @click="" alt="Photo de profil" />
    </div>
    <div class="card">
      <p class="card__profil--description">Courte description de l'utilisateur : {{ user.descriptionUser }}</p>
    </div>
    <button class="button btnDelete">Modifier le profil</button>
    <button @click="deleteAccount(user.id)" class="button btnDelete">Supprimer le profil</button>

    <Post :posts="postsUser" :getAllPost="getAllPostUser" />
  </div>

</template>


<script >
import Axios from "@/_services/caller.service";
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
      Axios.get(`/post/postUser/${localeUser.user_id}`)
        .then(res => this.postsUser = res.data.data);
    },
    getOneUser() {
      Axios.get(`/users/${localeUser.user_id}`)
        .then(res => {
          this.user = res.data.data;
          console.log('this.user : ', this.user);
        });
    },
    deleteAccount(userId) {
      Axios.delete(`/users/${userId}`, { user_id: userId })
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