<template>
  <div :key="index" v-for="(post, index) in posts.data" class="card">

    <div class="card__profil">
      <img class="card__profil--img" src="../assets/images/InZooPic.png" alt="Photo de profil" />
      <p class="card__title">{{ post.user_id }}</p>
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

    <!-- user_id a remplacer par le pseudo -->
      <p>user_id : {{ comment.user_id }}</p>

      <!-- Juste a titre informatif a retirer par la suite -->
      <p>post_id : {{ comment.post_id }}</p>
      <p>msg : {{ comment.comment }}</p>
    </div>
  </div>


</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';


const posts = ref([])
const comments = ref([]);

onMounted(async () => {
  await axios.get('http://localhost:8080/post/')
    .then(res => posts.value = res.data);

  // await axios.get('http://localhost:8080/comments/post/1')
  //   .then(res => comments.value = res.data);
})



</script>

<style lang="scss">
.card {
  width: auto;
  margin: 10px;
  padding: 10px;
  background-color: #192946;
  color: #b8b8b9;

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
    border: 2px solid red;
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
    border: 1px solid #d1515a;
    border-radius: 25px;
  }
}
</style>