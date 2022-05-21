<template>
  <section>
    <Header />
    <div class="row">
      <h1>Fil d'actualités</h1>
      <div class="row">
        <span class="userPseudo">{{ user.pseudo }}</span>
        <RouterLink to="/profil"><img class="nav__icon--imgProfil" :src="user.imgUser" alt="" /> </RouterLink>
      </div>
    </div>
    <AddPost :getAllPost="getAllPost" />
    <Post :posts="posts" :getAllPost="getAllPost" />
  </section>
</template>

<script >
import Axios from "@/_services/caller.service";
import AddPost from "../components/AddPost.vue";
import Post from "../components/Post.vue";
import Header from "@/components/Header.vue";

let locale = localStorage.getItem("user");
let localeUser = JSON.parse(locale);

export default {
  components: {
    Post,
    AddPost,
    Header,
  },
  data() {
    return {
      posts: [],
      user: {},
    };
  },
  created() {
    this.getOneUser();
    this.getAllPost();
  },
  methods: {
    getAllPost() {
      Axios.get("/post/").then((res) => (this.posts = res.data.data));
    },
    getOneUser() {
      Axios.get(`/users/${localeUser.user_id}`).then((res) => {
        this.user = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" >
@import "@/assets/sass/_variables.scss";
a {
  text-decoration: none;
  color: black;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.deconnexion {
  display: block;
}
.nav__icon {
  width: 50px;
  height: 50px;
  color: $grey;
}
.card {
  width: auto;
  &__modif {
    display: flex;
  }
  &__profil {
    display: flex;
    justify-content: space-between;
  }
}

.button {
  background-color: $red;
  margin: 0 5px;

  &:hover {
    color: black;
    cursor: pointer;
    background-color: $grey;
  }
}
.nav__icon--imgProfil {
  width: 75px;
  height: 75px;
  border-radius: 50px;
  transition: all 0.4s ease-in;
  &:hover {
    transform: scale(1.1);
  }
}
.userPseudo {
  margin-right: 5px;
  font-weight: bold;
  font-size: 20px;
}
// Responsive
@media screen and (max-width: 670px) {
  * {
    font-size: 16px;
  }
  h1 {
    font-size: 2em;
  }
  .logo {
    width: 300px;
    height: 60px;
  }
}
@media screen and (max-width: 440px) {
  h1 {
    font-size: 1.2em;
  }
  .logo {
    width: 200px;
    height: 40px;
  }
  .nav__icon--imgProfil {
    width: 45px;
    height: 45px;
  }
}
</style>