<template>
    <div class="card">
        <input type="text" @input="commentaire = $event.target.value" name="newPost" class="card__newPost" id="key"
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
                })
        },
    },
}
</script>
