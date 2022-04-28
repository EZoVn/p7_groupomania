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

    methods: {
        onFileSelected(event) {
            this.image = event.target.files[0]
            console.log(this.image);
        },
        // Comment envoyer l'image erreur 500 renvoyer
        async addPost() {
            const formData = new FormData();
           formData.append('message', this.post);
           formData.append('user_id', user.user_id);
           formData.append('file', this.image);
            console.log(formData);
            // await instance.put('/post', {imgUrl:formData, message: this.post, user_id: user.user_id })
            await instance.put('/post',formData)
            .then(res => {
                console.log(res);

            })
        },

    }
}
</script>

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