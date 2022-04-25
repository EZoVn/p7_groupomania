<template>
  <div :key="index" v-for="(post, index) in posts.data" class="card">
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
    <p>Commentaires : </p>
    <br />
    <p v-if="post.Comments == ''"> Aucun commentaire ..</p>
    <div v-for="comment in post.Comments" class="card__comment">
      <p>log comment : {{ comment }}</p>
      <!-- user_id a remplacer par le pseudo -->
      <p>user_id : {{ comment.user_id }}</p>

      <!-- Juste a titre informatif a retirer par la suite -->
      <p>post_id : {{ comment.post_id }}</p>
      <p>msg : {{ comment.comment }}</p>
    </div>

    <div class="card">
      <textarea :v-model="commentaire" name="newPost" class="card__newPost" id="" placeholder="Ajouter un commentaire " cols="30"
        rows="10"></textarea>
      <div class="btn">

        <!-- emoji  -->
        <!-- gif -->
        <button @click="addComment(commentaire, post.id)" class="button">Envoyer</button>
      </div>
    </div>
  </div>
</template>

<script >
import { ref } from 'vue';
import axios from 'axios';

export default {

  data() {

    return {
      posts: ref([]),
      commentaire: ref(''),
    }
  },
  
  async created() {
    this.posts = await axios.get('http://localhost:8080/post/')
      .then(res => res.data);
  },
  methods: {
    deletePost(postId) {
      console.log('Le post :', postId, 'a été supprimer avec succès !');
          axios.delete(`http://localhost:8080/post/${postId}`);    
        },
    addComment(commentaire, postId) {
      console.log(postId);
       console.log(this.commentaire);
    }
  }
}
</script>

<!-- version script setup pour afficher les posts -->

<!-- <script setup>

import { onMounted, ref } from 'vue';
import axios from 'axios';


const posts = ref([])
// const comments = ref([]);

onMounted(() => {
  axios.get('http://localhost:8080/post/')
    .then(res => posts.value = res.data);

  // await axios.get('http://localhost:8080/comments/post/1')
  //   .then(res => comments.value = res.data);
})
</script> -->

<style lang="scss">
@import "@/assets/sass/_variables.scss";

.card {
  width: auto;
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

  &__comment {
    margin: 5px;
    padding: 15px;
    border: 1px solid $red;
    border-radius: 25px;
  }
}
</style>