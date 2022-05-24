<template>
  <div class="card row">
    <input type="text" v-model="commentaire" name="newPost" class="card__newPost" placeholder="Ajouter un commentaire " />
    <button @click="addComment(commentaire, postId)" class="button btnDelete"><font-awesome-icon icon="play" /></button>
  </div>
</template>

<script>
import Axios from "@/_services/caller.service";
import { accountService } from "../_services/account.service";

export default {
  name: "AddComment",
  props: {
    postId: { type: Number },
    getAllPost: { type: Function },
  },
  data() {
    return {
      commentaire: "",
    };
  },
  methods: {
    addComment(comment, postId) {
      let user = accountService.getLocalStorage();
      Axios.post(`/comments/${[postId]}`, { comment, user_id: user.user_id }).then(() => {
        this.commentaire = "";
        this.getAllPost();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  margin: 0;
  padding: 16px;
}
.button {
  margin: 0;
  width: 10%;
}
@media screen and (max-width: 670px) {
  .button {
    width: auto;
  }
}
</style>