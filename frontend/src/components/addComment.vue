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
import { ref } from 'vue';
import axios from 'axios';

let locale = localStorage.getItem('user');
let user = JSON.parse(locale);

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Authorization': `Bearer ${user.access_token}` },
});

export default {
    name: 'AddComment',
    props: {
        postId: { type: Number },
        getAllPost: { type: Function },
    },
    data() {
        return {
            commentaire: "",
            // commentaire: ref(""),
        };
    },
    methods: {
        addComment(comment, postId) {
            instance.post(`/comments/${[postId]}`, { comment })
                .then(() => {
                    this.getAllPost()
                })
        },
    },
}
</script>
