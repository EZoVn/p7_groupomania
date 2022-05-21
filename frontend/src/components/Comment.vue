<template>
  <div class="comment">
    <p v-if="post.Comments != ''">Commentaires :</p>
    <br />
    <p v-if="post.Comments == ''">Aucun commentaire ..</p>

    <div v-for="(comment, index) in post.Comments" :key="index" class="card__comment">
      <div class="card__comment--info">
        <div class="card__comment--user">
          <img class="card__profil--img" :src="comment.User.imgUser" alt="" />
          <p>{{ comment.User.pseudo }}</p>
        </div>

        <div>         
          <button v-if="comment.User.id === userId" @click="switchModify(index)" class="button btnDelete"><font-awesome-icon icon="pen" /></button>
          <button v-if="comment.User.id === userId" @click="deleteComment(comment.id)" class="button btnDelete"><font-awesome-icon icon="trash" /></button>
        </div>
      </div>

      <p>{{ comment.comment }}</p>
      <div v-show="isActive == index" class="row">
        <input type="text" v-model="commentaire" name="newPost" class="card__newPost"  placeholder="Modifier commentaire " />
        <button @click="modifyComment(commentaire, comment.id)" class="button btnDelete"><font-awesome-icon icon="play" /></button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "@/_services/caller.service";
import { accountService } from "../_services/account.service";

export default {
  name: "Comment",
  data() {
    return {
      isActive: null,
      commentaire: "",
      userId: "",
    };
  },
  props: {
    post: { type: Object },
    getAllPost: { type: Function },
  },
  mounted() {
    let user = accountService.getLocalStorage();
    this.userId = user.user_id;
  },
  methods: {
    switchModify(commentId) {
      if (this.isActive == commentId) {
        this.isActive = null;
      } else {
        this.isActive = commentId;
      }
    },
    modifyComment(comment, commentId) {
      if (this.commentaire != "") {
        Axios.put(`/comments/${commentId}`, { comment })
          .then(() => {
            this.getAllPost();
            this.commentaire = "";
            this.isActive = null;
            this.$toast.success("Le commentaire a bien été modifier !")
          })
          .catch((e) => console.log("error", e));
        this.isActive = true;
      } else {
        this.$toast.alert("Le commentaire n'a pas pu être modifier");
      }
    },
    deleteComment(commentId) {
      Axios.delete(`/comments/${commentId}`)
        .then(() => {
          this.getAllPost();
          this.$toast.show("Le commentaire a bien été supprimer avec succès !")
        })
        .catch(() => this.$toast.alert("Le commentaire n'a pas pu être supprimer"));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";

.comment {
  margin-top: 25px;
}
.card {
  &__comment {
    margin: 5px;
    padding: 15px;
    border: 1px solid $grey;
    border-radius: 25px;
    background-image: linear-gradient(57deg, $blue 0%, $grey 130%);
    &--info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }
    &--user {
      display: flex;
      align-items: center;
    }
  }
}
.button{
  margin: 5px;
}
input{
    margin: 0;
    padding: 16px;
}
</style>