<script setup>
import Post from "../components/Post.vue";
// import { onMounted, ref } from 'vue';
// import axios from 'axios';


// const posts = ref([])

// onMounted(async () => {
//     await axios.get('http://localhost:8080/post/')
//         .then(res => posts.value = res.data)
// })

// const comments = ref([]);
// const com = onMounted(() => {
//     axios.get('http://localhost:8080/comments/post/1')
//         .then(res => comments.value = res.data);
// })


</script>

<template>
    <section>

        <div class="card">
            <!-- <input type="text" id="" class="card__newPost" placeholder="Quoi de neuf ?"/> -->
            <textarea name="newPost" class="card__newPost" id="" placeholder="Quoi de neuf ?" cols="30"
                rows="10"></textarea>
            <div class="btn">

                <button name="ajoutPhoto" class="button">Ajouter une photo</button>
                <!-- emoji  -->
                <!-- gif -->
                <button class="button">Envoyer</button>
            </div>
        </div>

        <Post />

        <!-- <div :key="index" v-for="(post, index) in posts.data" class="card">

            <div class="card__profil">
                <img class="card__profil--img" src="../assets/images/InZooPic.png" alt="Photo de profil" />
                <p class="card__title">{{ post.user_id }}</p>
            </div>

            <div>
                <p class="card__text">
                    {{ post.message }}
                </p>
                <img class="card__img" :src="post.imgUrl" alt="description image" />
            </div>
            <span>Commentaires : </span>
            <div :key="index" v-for="(comment, index) in comments.data" class="comment">

                <span>--------</span>
                <p>
                    user_id : {{ comment.user_id }}
                </p>
                <p>post_id : {{ comment.post_id }}</p>
                <p>
                    msg : {{ comment.comment }}
                </p>
            </div>
            Ajouter un commentaire
        </div> -->
    </section>

</template>

<style lang="scss" scoped>
.btn {
    display: flex;
    flex-direction: row;
    // justify-content:space-between;

}

.button {
    margin: 0 20px;
}

.card {

    &__newPost {
        margin-bottom: 10px;
        height: 100px;
        width: 100%;
        padding: 10px;
        border-radius: 16px;
    }
}
.button{
    &:hover {
    cursor: pointer;
    background-color: #d1515a;
  }
}
</style>