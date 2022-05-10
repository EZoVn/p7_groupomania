<template>
  <div :key="post.id" v-for="post in posts" class="card">
    <div class="card__profil">
      <img class="card__profil--img" :src="post.User.imgUser" alt="Photo de profil" />
      <p class="card__title">{{ post.User.pseudo }}</p>


      <div>
        <button @click="deletePost(post.id)" class="button btnDelete">Supprimer le post</button>
        <button @click="switchModify()" class="button btnDelete">Modifier le post</button>
        <!-- <input v-model="modifyPost" :class="{ mode: isActive }" type="text"  name="newPost" -->
        <input :class="{ mode: isActive }" type="text" @input="modifPost = $event.target.value" name="newPost"
          class="card__newPost" id="comment.id" placeholder="Modifier post ">

        <input ref="imgInputChange" type="file" @change="fileSelected" :class="{ mode: isActive }">
        <!-- <input style="display:none" ref="imgInputChange" type="file" @change="fileSelected"> -->
        <!-- <button @click="$refs.imgInputChange.click()" name="modifyPhoto" class="button btnDelete">Ajouter une
          photo</button> -->

        <button :class="{ mode: isActive }" @click="modifyPost(modifPost, post.id)" class="button btnDelete">Envoyer
          le post modifier</button>
      </div>
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

<script>
import { ref } from 'vue';
import Axios from "@/_services/caller.service";
import Comment from './Comment.vue';
import AddComment from './AddComment.vue';

import { accountService } from "../_services/account.service"

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
      isActive: true,
      post: ref(''),
      newImage: null,
      modifPost: '',
    }
  },
  methods: {
    deletePost(postId) {
      Axios.delete(`/post/${postId}`)
        .then(() => {
          console.log("Le post :", postId, "a été supprimer avec succès !");
          this.getAllPost()
        })
    },

    // Modification post en travaux
    switchModify() {
      if (this.isActive == false) return this.isActive = true;
      if (this.isActive == true) return this.isActive = false;
    },
    fileSelected(event) {
      console.log('test fileSelected');
      this.newImage = event.target.files[0]
      console.log(this.newImage);
    },
    modifyPost(modifPost, postId) {
      let user = accountService.getLocalStorage();
      const formData = new FormData();
      formData.append('message', this.modifPost);
      formData.append('user_id', user.user_id);
      formData.append('file', this.newImage);
      Axios.put(`/post/${postId}`, formData)
        .then(() => {
          this.getAllPost();
          console.log('Le post a été modifier avec succès !');
        })
    },
  },
}
</script>


<style lang="scss">
@import "@/assets/sass/_variables.scss";

.mode {
  display: none;
}

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