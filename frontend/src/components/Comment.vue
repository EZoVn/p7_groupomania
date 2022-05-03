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
                <button @click="deleteComment(comment.id, comment.User.id)" class="button btnDelete">Supprimer</button>
            </div>

            <!-- Trouver une solution pour modifier un commentaire en affichant un input ou textarea -->
            <!-- <button @click="modifyComment(comment.id)" class="button btnDelete">Modifier</button> -->

            <!-- Juste a titre informatif a retirer par la suite -->
            <p>post_id : {{ comment.post_id }}</p>
            <p>msg : {{ comment.comment }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

let locale = localStorage.getItem('user');
let user = JSON.parse(locale);

export default {
    name: 'Comment',
    props: {
        post: { type: Object }
    },
    methods: {
        deleteComment(commentId, user_id) {
            console.log(commentId);
            console.log(user.access_token);
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + user.access_token
                },
                data: { user_id: user_id }
            };
            axios.delete(`http://localhost:8080/comments/${commentId}`, config);
            console.log("Le commentaire :", commentId, "a été supprimer avec succès !");
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