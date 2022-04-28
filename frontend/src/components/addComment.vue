<template>
    <div class="card">
        <p>test</p>
        <textarea name="newPost" class="card__newPost" placeholder="Ajouter un commentaire " cols="30"
            rows="10"></textarea>
        <div class="btn">

            <button class="button">Envoyer</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'addComment',
    props: {
        // post: { type: Object }
        postId: { type: Number }
    },
    data() {
        return {
            // posts: ref([]),
            commentaire: ref(""),
        };
    },
    methods: {
        newComment(comment, postId) {
            console.log(postId);
            console.log(this.commentaire);
            console.log(comment);
        }
    },

}
</script>
