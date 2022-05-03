<template>
    <div class="card">
        <input type="text" @input="commentaire = $event.target.value" name="newPost" class="card__newPost" id="key"
            placeholder="Ajouter un commentaire ">
        <!-- <textarea @input="commentaire = $event.target.value" name="newPost" class="card__newPost" id="key"
        placeholder="Ajouter un commentaire " cols="30" rows="10"></textarea> -->
        <div class="btn">


            <button @click="addComment(commentaire, postId)" class="button btnDelete">Envoyer</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
});
let locale = localStorage.getItem('user');
let user = JSON.parse(locale);

export default {
    name: 'AddComment',
    props: {
        postId: { type: Number },
        getAllPost: { type: Function },
    },
    data() {
        return {
            commentaire: ref(""),
        };
    },
    methods: {
        addComment(comment, postId) {
            console.log(postId);
            console.log(this.commentaire);
            instance.put(`/comments/${[postId]}/${user.user_id}`, { user_id: user.user_id, comment: comment, post_id: postId })
                .then(res => {
                    this.getAllPost()
                    console.log(res)
                })
        },
    },
}
</script>
