<template>
  <div>
    <div :key="index" v-for="(post, index) in posts" class="card">
      <div class="card__profil">
        <div class="row float">
          <img class="card__profil--img" :src="post.User.imgUser" alt="Photo de profil" />
          <p class="card__title">{{ post.User.pseudo }}</p>
        </div>

        <div class="row">
          <div class="row">
            <button v-if="post.User.id === userId && isActive == null" @click="switchModify(index)" class="button btnDelete"><font-awesome-icon icon="pen-to-square" /></button>
            <button v-if="isActive == index" @click="switchModify(index)" class="button btnDelete"><font-awesome-icon icon="xmark" /></button>
            <button v-if="post.User.id === userId" @click="deletePost(post.id)" class="button btnDelete"><font-awesome-icon icon="trash" /></button>
          </div>

          <div class="row" v-show="isActive == index">
            <input type="text" @input="modifPost = $event.target.value" name="newPost" class="card__newPost" placeholder="Modifier post " />
            <input ref="imgInputChange" type="file" @change="fileSelected" style="display: none" />

            <button @click="$refs.imgInputChange[index].click()" name="modifyPhoto" class="button btnDelete"><font-awesome-icon icon="image" /></button>
            <button @click="modifyPost(modifPost, post.id)" class="button btnDelete"><font-awesome-icon icon="play" /></button>
          </div>
        </div>
      </div>

      <div>
        <p class="card__text">
          {{ post.message }}
        </p>
        <img v-show="post.imgUrl != null" class="card__img" :src="post.imgUrl" alt="description image" />
      </div>
      <br />
      <br />
      <hr />
      <Comment :post="post" :getAllPost="getAllPost" />
      <AddComment :postId="post.id" :getAllPost="getAllPost" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Axios from "@/_services/caller.service";
import Comment from "./Comment.vue";
import AddComment from "./AddComment.vue";

import { accountService } from "../_services/account.service";

export default {
  name: "Post",
  components: {
    Comment,
    AddComment,
  },
  props: {
    posts: { type: Array },
    getAllPost: { type: Function },
  },
  data() {
    return {
      isActive: null,
      post: ref(""),
      newImage: null,
      modifPost: "",
      userId: "",
    };
  },
  mounted() {
    let user = accountService.getLocalStorage();
    this.userId = user.user_id;
  },
  methods: {
    deletePost(postId) {
      Axios.delete(`/post/${postId}`).then(() => {
        console.log("Le post :", postId, "a été supprimer avec succès !");
        this.getAllPost();
        this.isActive = null;
        this.$toast.show("Post supprimé !")
      });
    },
    switchModify(postId) {
      if (this.isActive == postId) {
        this.isActive = null;
      } else {
        this.isActive = postId;
      }
    },
    fileSelected(event) {
      this.newImage = event.target.files[0];
      console.log(this.newImage);
    },
    modifyPost(modifPost, postId) {
      let user = accountService.getLocalStorage();
      const formData = new FormData();
      formData.append("message", this.modifPost);
      formData.append("user_id", user.user_id);
      formData.append("file", this.newImage);
      Axios.put(`/post/${postId}`, formData).then(() => {
        this.getAllPost();
        this.isActive = null;
        this.$toast.success('Le post a été modifier !');
      });
    },
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";

input {
  margin: 0;
  padding: 16px;
}
</style>