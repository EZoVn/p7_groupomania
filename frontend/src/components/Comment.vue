<template>
    <div class="comment">
        <!-- {{ post.Comments }} -->
        <p>Commentaires : </p>
        <br />
        <p v-if="post.Comments == ''"> Aucun commentaire ..</p>
        <div v-for="comment in post.Comments" :key="comment.id" class="card__comment">
            <div class="card__comment--info">
                <div class="card__comment--user">
                    {{ comment.User.id }}
                    <img class="card__profil--img" :src="comment.User.imgUser" alt="">
                    <p>{{ comment.User.pseudo }}</p>
                    <!-- <p>user_id : {{ comment.user_id }}</p> -->
                </div>
                <div>
                    <button @click="deleteComment(comment.id)" class="button btnDelete">Supprimer</button>
                    <button @click="switchModify()" class="button btnDelete">Modifier</button>
                </div>
            </div>

            <!-- Juste a titre informatif a retirer par la suite -->
            <p>post_id : {{ comment.post_id }}</p>
            <p>msg : {{ comment.comment }}</p>

            <!-- Trouver une solution afin d'afficher le input du commentaire uniquement-->
            <input :class="{ mode: isActive }" type="text" @input="commentaire = $event.target.value" name="newPost"
                class="card__newPost" id="comment.id" placeholder="Modifier commentaire ">
            <button :class="{ mode: isActive }" @click="modifyComment(commentaire, comment.id)"
                class="button btnDelete">Envoyer
                le commentaire modifier</button>


        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import  Axios  from "@/_services/caller.service";

export default {
    name: 'Comment',
    data() {
        return {
            isActive: true,
            commentaire: ref(''),
        }
    },
    props: {
        post: { type: Object },
        getAllPost: { type: Function }
    },

    methods: {
        switchModify() {
            if (this.isActive == false) return this.isActive = true;
            if (this.isActive == true) return this.isActive = false;
        },
        modifyComment(comment, commentId) {
            console.log(commentId);
            Axios.put(`/comments/${commentId}`, { comment })
                .then(() => {
                    this.getAllPost();
                    console.log("Le commentaire a bien été modifier !")
                })
                .catch(e => console.log("error", e))
            this.mode = false;
        },
        deleteComment(commentId) {
            Axios.delete(`/comments/${commentId}`)
                .then(() => {
                    this.getAllPost();
                    console.log("Le commentaire :", commentId, "a été supprimer avec succès !");
                })
                .catch(e => console.log(`Le commentaire n'a pas été supprimé`, e))
        },
    }
}
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