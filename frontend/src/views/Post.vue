<!-- <script setup>
import Post from "../components/Post.vue";

const addPost = () => {
    console.log('test');
//   axios.put('http://localhost:8080/post/')
//     .then(res => res.data)
}
</script> -->

<script >
import Post from "../components/Post.vue";
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080',
});
let locale = localStorage.getItem('user');
let user = JSON.parse(locale);
console.log(user.user_id);
export default {
    name: Post,
    components: {
        Post,
    },
    data() {
        return {
            post: '',
            image: null,
        }
    },
    props: {
        comment: {
            modelValue: String
        }
    },
    components: {
        Post,
    },
    methods: {
        onFileSelected(event) {
            this.image = event.target.files[0]
            console.log(this.image);
        },
        // Comment envoyer l'image erreur 500 renvoyer
        async addPost(post) {
            const fd = new FormData();

            // fd.append('image', this.image, this.image.name)
            fd.append('image', this.image);

            // fd.append('file', this.image)
            console.log(fd);
            await instance.put('/post/', {imgUrl:fd, message: this.post, user_id: user.user_id })
                .then(res => {
                    console.log(res);

                })
        },

    }
}
</script>

<template>
    <section>

        <div class="card">
            <textarea v-model="post" name="newPost" class="card__newPost" id="" placeholder="Quoi de neuf ?" cols="30"
                rows="10"></textarea>
            <div class="btn">
                <input style="display:none" ref="imgInput" type="file" @change="onFileSelected">
                <button @click="$refs.imgInput.click()" name="ajoutPhoto" class="button">Ajouter une photo</button>
                <!-- emoji  -->
                <!-- gif -->
                <button class="button" @click="addPost()">Envoyer</button>
            </div>
        </div>

        <Post />

    </section>

</template>

<style lang="scss" >
@import "@/assets/sass/_variables.scss";

.deconnexion {
    display: block;
}

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

.button {
    background-color: $red;

    &:hover {
        color: black;
        cursor: pointer;
        background-color: $grey;
    }
}
</style>