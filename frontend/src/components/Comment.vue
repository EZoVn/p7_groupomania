<template>
    <div>
        <!-- {{ post.Comments }} -->
        <p>Commentaires : </p>
        <br />
        <p v-if="post.Comments == ''"> Aucun commentaire ..</p>
        <div v-for="comment in post.Comments" :key="comment.id" class="card__comment">
            <div class="card__comment--user">
                <!-- <p>log comment : {{ comment }}</p> -->
                {{comment.id}}
                <p>Pseudo : {{ comment.User.pseudo }}</p>
                <p>user_id : {{ comment.user_id }}</p>
            </div>
            <button @click="deleteComment(comment.id)" class="button">supprimer</button>
            <!-- Juste a titre informatif a retirer par la suite -->
            <p>post_id : {{ comment.post_id }}</p>
            <p>msg : {{ comment.comment }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Comment',
    props: {
        post: { type: Object }
    },
    methods: {
        deleteComment(commentId) {
            console.log(commentId);
            console.log("Le commentaire :", commentId, "a été supprimer avec succès !");
            axios.delete(`http://localhost:8080/comments/${commentId}`);
        },
    }
}
</script>

<style lang="scss">
@import "@/assets/sass/_variables.scss";

.card {
    &__comment {
        margin: 5px;
        padding: 15px;
        border: 1px solid $red;
        border-radius: 25px;
    }
}
</style>