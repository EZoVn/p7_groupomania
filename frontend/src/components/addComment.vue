<template>
    <div class="card">
        <input type="text" v-model="commentaire" name="newPost" class="card__newPost" 
            placeholder="Ajouter un commentaire ">
        <div class="btn">
            <button @click="addComment(commentaire, postId)" class="button btnDelete">Envoyer</button>
        </div>
    </div>
</template>

<script>
import Axios from "@/_services/caller.service";

export default {
    name: 'AddComment',
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
            Axios.post(`/comments/${[postId]}`, { comment })
                .then(() => {
                    this.getAllPost()
                    this.commentaire = '';
                })
        },
    },
}
</script>
