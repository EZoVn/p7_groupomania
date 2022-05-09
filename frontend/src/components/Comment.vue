<template>
    <div class="comment">
        <!-- {{ post.Comments }} -->
        <p>Commentaires : </p>
        <br />
        <p v-if="post.Comments == ''"> Aucun commentaire ..</p>
        <div v-for="comment in post.Comments" :key="comment.id" class="card__comment">
            <div class="card__comment--info">
                {{ comment.User.id }}
                <div class="card__comment--user">
                    <!-- <p>log comment : {{ comment }}</p> -->
                    <!-- {{comment.id}} -->
                    <img class="card__profil--img" :src="comment.User.imgUser" alt="">
                    <p>{{ comment.User.pseudo }}</p>
                    <!-- <p>user_id : {{ comment.user_id }}</p> -->
                </div>
                <button @click="deleteComment(comment.id)" class="button btnDelete">Supprimer</button>
            </div>

            <!-- Juste a titre informatif a retirer par la suite -->
            <p>post_id : {{ comment.post_id }}</p>
            <p>msg : {{ comment.comment }}</p>

            <!-- Trouver une solution afin de pouvoir modifier uniquement le commentaire selectionner affiche pour tous les com du post-->
            <button @click="switchModify()" class="button btnDelete">Modifier</button>
            <input v-if="mode == 'modify'" type="text" @input="commentaire = $event.target.value" name="newPost"
                class="card__newPost" id="comment.id" placeholder="Modifier commentaire ">
            <button v-if="mode == 'modify'" @click="modifyComment(commentaire, comment.id)"
                class="button btnDelete">Appliquer la modification</button>


        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

let locale = localStorage.getItem('user');
let user = JSON.parse(locale);

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Authorization': `Bearer ${user.access_token}` },
});

export default {
    name: 'Comment',
    data() {
        return {
            mode: 'affichage',
            commentaire: ref(''),
        }
    },
    props: {
        post: { type: Object },
        getAllPost: { type: Function }
    },

    methods: {
        switchModify() {
            this.mode = 'modify';
        },
        modifyComment(comment, commentId) {
            console.log(commentId);
            instance.put(`/comments/${commentId}`, { comment: comment })
                .then(() => {
                    this.getAllPost();
                    console.log("Le commentaire a bien été modifier !")
                })
                .catch(e => console.log("error", e))
            this.mode = 'affichage';
        },
        deleteComment(commentId) {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + user.access_token
                },
            };
            axios.delete(`http://localhost:8080/comments/${commentId}`, config)
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