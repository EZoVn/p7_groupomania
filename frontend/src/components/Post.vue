<template>
  <div :key="index" v-for="(post, index) in posts" class="card">
    <div class="card__profil">
      <img class="card__profil--img" src="../assets/images/InZooPic.png" alt="Photo de profil" />
      <p class="card__title">{{ post.user_id }}</p>

      <button @click="deletePost(post.id)" class="button">Supprimer le post</button>
    </div>

    <div>
      <p class="card__text">
        {{ post.message }}
      </p>
      <img class="card__img" :src="post.imgUrl" alt="description image" />
    </div>
    {{ post.id }}
    <Comment :post="post" />
    <!-- <addComment :postId="post.id" /> -->

    <div class="card">
      <!-- <textarea :v-model="commentaire" name="newPost" class="card__newPost" id="key" -->
      <textarea @input="commentaire = $event.target.value" name="newPost" class="card__newPost" id="key"
        placeholder="Ajouter un commentaire " cols="30" rows="10"></textarea>
      <div class="btn">


        <button @click="addComment(commentaire, post.id)" class="button">Envoyer</button>
      </div>
    </div>
  </div>
</template>

<script >
import { ref } from 'vue';
import axios from 'axios';
import Comment from './Comment.vue';
import addComment from './addComment.vue';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});
let locale = localStorage.getItem('user');
let user = JSON.parse(locale);

export default {
  name: 'Post',
  components: {
    Comment,
    addComment,
  },
  data() {
    return {
      posts: [],
      // posts: ref([]),
      commentaire: ref(""),
    };
  },
  created() {
    this.getAllPost();
  },
  watchers: {
    getAllPost() {
      console.log("test");
      return this.posts;
    }
  },
  methods: {
    getAllPost() {
      axios.get("http://localhost:8080/post/")
        .then(res => this.posts = res.data.data);
    },
    deletePost(postId) {
      console.log("Le post :", postId, "a été supprimer avec succès !");
      axios.delete(`http://localhost:8080/post/${postId}`);
    },
    addComment(comment, postId) {
      console.log(postId);
      console.log(this.commentaire);
      // instance.put(`/comments/${[postId]}/${user.user_id}`, this.commentaire).then(res => console.log(res))
      instance.put(`/comments/${[postId]}/${user.user_id}`, { user_id: user.user_id, comment: comment, post_id: postId }).then(res => console.log(res))
    },
    
  },
}
</script>


<style lang="scss">
@import "@/assets/sass/_variables.scss";

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


}
</style>