<template>
  <div :key="post.id" v-for="post in posts" class="card">
    <div class="card__profil">
      <img class="card__profil--img" :src="post.User.imgUser" alt="Photo de profil" />
      <p class="card__title">{{ post.User.pseudo }}</p>

      <button @click="deletePost(post.id)" class="button btnDelete">Supprimer le post</button>

      <!-- <button @click="modifyPost(post.id)" class="button btnDelete">Modifier</button> -->

    </div>

    <div>
      <p class="card__text">
        {{ post.message }}
      </p>
      <img v-show="post.imgUrl != null" class="card__img" :src="post.imgUrl" alt="description image" />
    </div>
    <Comment :post="post" :getAllPost="getAllPost" />

    <AddComment :postId="post.id" :getAllPost="getAllPost" />

  </div>
</template>

<script >
import axios from 'axios';
import Comment from './Comment.vue';
import AddComment from './AddComment.vue';

let locale = localStorage.getItem('user');
let user = JSON.parse(locale);

export default {
  name: 'Post',
  components: {
    Comment,
    AddComment
  },
  props: {
    posts: { type: Array },
    getAllPost: { type: Function }
  },
  data() {
    return {

    }
  },
  methods: {
    deletePost(postId) {
      axios.delete(`http://localhost:8080/post/${postId}`, { headers: { 'Authorization': `Bearer ${user.access_token}` } })
        .then(() => {
          console.log("Le post :", postId, "a été supprimer avec succès !");
          this.getAllPost()
        })
    },
    // modifyPost(postId) {
    //   console.log('Le post va etre modifier');
    //   axios.put(`http://localhost:8080/post/${postId}`, )
    // },
  },
}
</script>


<style lang="scss">
@import "@/assets/sass/_variables.scss";

.btnDelete {
  padding: 5px;
  width: auto;
}

.card {
  width: 800px;
  margin: 10px;
  padding: 10px;
  background-color: $blue;
  color: $grey;

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
</style>