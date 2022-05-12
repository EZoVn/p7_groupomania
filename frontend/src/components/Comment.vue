<template>
  <div class="comment">
    <p>Commentaires :</p>
    <br />
    <p v-if="post.Comments == ''">Aucun commentaire ..</p>
    <div v-for="(comment, index) in post.Comments" :key="index" class="card__comment">
      <div class="card__comment--info">
        <div class="card__comment--user">
          <img class="card__profil--img" :src="comment.User.imgUser" alt="" />
          <p>{{ comment.User.pseudo }}</p>
        </div>
        <div>
          <button @click="deleteComment(comment.id)" class="button btnDelete">Supprimer</button>
          <button @click="switchModify(index)" class="button btnDelete">Modifier</button>
        </div>
      </div>


      <p>{{ comment.comment }}</p>
      <div v-show="isActive == index">
        <input type="text" @input="commentaire = $event.target.value" name="newPost" class="card__newPost" id="comment.id" placeholder="Modifier commentaire " />
        <button @click="modifyComment(commentaire, comment.id)" class="button btnDelete">Envoyer le commentaire modifier</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Axios from "@/_services/caller.service";

export default {
  name: "Comment",
  data() {
    return {
      isActive: null,
      commentaire: ref(""),
    };
  },
  props: {
    post: { type: Object },
    getAllPost: { type: Function },
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
      console.log(commentId);
      Axios.put(`/comments/${commentId}`, { comment })
        .then(() => {
          this.getAllPost();
          console.log("Le commentaire a bien été modifier !");
          this.isActive = null;
        })
        .catch((e) => console.log("error", e));
      this.isActive = true;
    },
    deleteComment(commentId) {
      Axios.delete(`/comments/${commentId}`)
        .then(() => {
          this.getAllPost();
          console.log("Le commentaire :", commentId, "a été supprimer avec succès !");
        })
        .catch((e) => console.log(`Le commentaire n'a pas été supprimé`, e));
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/_variables.scss";

.mode {
  display: none;
}

.comment {
  margin-top: 25px;
  padding-left: 20px;
}

.card {
  &__comment {
    margin: 5px;
    padding: 15px;
    border: 1px solid $red;
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
</style>