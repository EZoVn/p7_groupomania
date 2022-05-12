<template>
  <div>
    <!-- Modification Account -->
    <div class="card" :class="{ mode: isActive }">
      <input v-model="newPseudo" class="card__newPost" type="text" name="newpseudo" placeholder="Changer de pseudo ici " />
      <input v-model="newEmail" class="card__newPost" type="email" name="newEmail" placeholder="Modifier votre email " />
      <input v-model="newDescription" class="card__newPost" type="text" name="newDescription" placeholder="Modifier votre description " />

      <input ref="imgChange" type="file" @change="fileSelected" style="display: none" />
      <button @click="$refs.imgChange.click()" name="modifyPhoto" class="button btnDelete">Ajouter une photo</button>

      <button @click="modifyAccount(user.id)" class="button btnDelete">Modifier le profil utilisateur</button>
    </div>

    <div class="card card__profil">
      {{ user.id }}
      <p class="card__profil--pseudo">{{ user.pseudo }}</p>
      <p class="card__profil--description">Email : {{ user.email }}</p>

      <img class="card__profil--img" :src="user.imgUser" @click="tt" alt="Photo de profil" />
    </div>
    <div class="card">
      <p class="card__profil--description">Courte description de l'utilisateur : {{ user.descriptionUser }}</p>
    </div>
    <button @click="switchModify()" class="button btnDelete">Modifier le profil</button>
    <button @click="deleteAccount(user.id)" class="button btnDelete">Supprimer le profil</button>

    <Post :posts="postsUser" :getAllPost="getAllPostUser" />
  </div>
</template>


<script >
import Axios from "@/_services/caller.service";
import Post from "../components/Post.vue";
import { ref } from "vue";

let locale = localStorage.getItem("user");
let localeUser = JSON.parse(locale);

export default {
  name: "Profil",
  components: {
    Post,
  },
  data() {
    return {
      isActive: true,
      user: {},
      postsUser: [],
      newPseudo: "",
      newEmail: "",
      newimage: null,
      newDescription: "",
    };
  },
  created() {
    this.getOneUser();
    this.getAllPostUser();
  },
  methods: {
    getAllPostUser() {
      Axios.get(`/post/postUser/${localeUser.user_id}`).then((res) => (this.postsUser = res.data.data));
    },
    getOneUser() {
      Axios.get(`/users/${localeUser.user_id}`).then((res) => {
        this.user = res.data.data;
        console.log("this.user : ", this.user);
      });
    },
    deleteAccount(userId) {
      Axios.delete(`/users/${userId}`, { user_id: userId }).then(() => {
        this.$store.commit("logout");
        this.$router.push("/");
        console.log(`Le compte ${userId} a été supprimer !`);
      });
    },
    switchModify() {
      if (this.isActive == false) return (this.isActive = true);
      if (this.isActive == true) return (this.isActive = false);
    },
    fileSelected(event) {
      console.log("test fileSelected");
      this.newImage = event.target.files[0];
      console.log(this.newImage);
    },
    modifyAccount(userId) {
      console.log(`userId : ${userId} // email : ${this.newEmail} // pseudo : ${this.newPseudo} // imgUser : ${this.newImage}`);
      console.log(this.newEmail);
      const formData = new FormData();
      formData.append("email", this.newEmail);
      formData.append("pseudo", this.newPseudo);
      formData.append("user_id", userId);
      formData.append("file", this.newImage);
      console.log(formData);
      Axios.put(`/users/${userId}`, formData).then((res) => {
        console.log(res);
        this.getOneUser();
      });
    },
  },
};
</script>

<style lang="scss">
.deconnexion {
  display: block;
}

.card {
  width: auto;

  &__profil {
    display: flex;
    justify-content: space-between;
  }
}
</style>