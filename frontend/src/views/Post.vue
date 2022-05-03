<template>
    <section>
        <AddPost :getAllPost="getAllPost"/>
        <Post :posts="posts" />

    </section>

</template>

<script >
import axios from 'axios';
import AddPost from "../components/AddPost.vue";
import Post from "../components/Post.vue";

export default {
    // name: Post,
    components: {
        Post,
        AddPost,
    },
    data() {
        return {
            posts: [],
        }
    },
    created() {
        this.getAllPost();
    },
    watch: {
        posts() {
            // this.getAllPost();
            // console.log('newVal:');

        }
    },
    methods: {
        getAllPost() {
            axios.get("http://localhost:8080/post/")
                .then(res => {
                    console.log(res);
                    this.posts = res.data.data
                    console.log(this.posts);
                });
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


.button {
    background-color: $red;

    &:hover {
        color: black;
        cursor: pointer;
        background-color: $grey;
    }
}
</style>