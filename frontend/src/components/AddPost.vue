<template>
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
</template>

<script>
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080',
});
let locale = localStorage.getItem('user');
let user = JSON.parse(locale);
console.log(user.user_id);

export default {
    name: "AddPost",
    data() {
        return {
            post: '',
            image: null,
        }
    },
    props: {
        getAllPost: { type: Function }
    },
    methods: {
        onFileSelected(event) {
            this.image = event.target.files[0]
            console.log(this.image);
        },
        async addPost() {
            const formData = new FormData();
            formData.append('message', this.post);
            formData.append('user_id', user.user_id);
            formData.append('file', this.image);
            await instance.put('/post', formData)
                .then(res => {
                    console.log(res);
                    this.image = null;
                    this.getAllPost();
                })
        },

    }
}
</script>

<style lang="scss" scoped>
.card__newPost {
    margin-bottom: 10px;
    height: 100px;
    width: 100%;
    padding: 10px;
    border-radius: 16px;
}
</style>