<template>
  <div>
    <Header />
    <div class="row">
      <RouterLink to="/post"><font-awesome-icon class="nav__icon" icon="arrow-left-long" /></RouterLink>
      <h1>Mon profil</h1>
    </div>
    <div class="card">
      <img class="card__profil--img" :src="user.imgUser"  alt="Photo de profil" />
      <div class="card card__profil">
        <p class="card__profil--pseudo">Pseudo : <span>{{ user.pseudo }}</span></p>
        <p class="card__profil--description">Email : {{ user.email }}</p>
      </div>
      <div class="card">
        <p class="card__profil--description">Description de l'utilisateur :</p>
        <br />
        {{ user.descriptionUser }}
      </div>
    </div>
    <button v-if="isActive == true" @click="switchModify()" class="button btnDelete"><font-awesome-icon icon="user-pen" /></button>
    <button v-if="isActive == false" @click="switchModify()" class="button btnDelete"><font-awesome-icon icon="xmark" /></button>
    <button @click="deleteAccount(user.id)" class="button btnDelete">Supprimer le profil</button>

    <!-- Modification Account -->
    <div class="card" :class="{ mode: isActive }">
      <div class="card__modif">
        <input v-model="newPseudo" class="card__newPost" type="text" name="newpseudo" placeholder="Changer de pseudo ici " />
        <button @click="changePseudo(user.id)" class="button btnDelete"><font-awesome-icon icon="check" /></button>
      </div>

      <div class="card__modif">
        <input v-model="newEmail" class="card__newPost" type="email" name="newEmail" placeholder="Modifier votre email " />
        <button @click="changeMail(user.id)" class="button btnDelete"><font-awesome-icon icon="check" /></button>
      </div>

      <div class="card__modif">
        <input v-model="newPassword" class="card__newPost" type="password" name="newEmail" placeholder="Modifier votre mot de passe " />
        <input v-model="newPasswordVerif" class="card__newPost" type="password" name="newEmail" placeholder="Vérifier votre mot de passe " />
        <button @click="changePassword(user.id)" class="button btnDelete"><font-awesome-icon icon="check" /></button>
      </div>

      <div class="card__modif">
        <input v-model="newDescription" class="card__newPost" type="text" name="newDescription" placeholder="Modifier votre description " />
        <button @click="changeDescription(user.id)" class="button btnDelete"><font-awesome-icon icon="check" /></button>
      </div>

      <div class="card__modif">
        <p>Modifier la photo</p>
        <input ref="imgChange" type="file" @change="fileSelected" style="display: none" />
        <button @click="$refs.imgChange.click()" name="modifyPhoto" class="button btnDelete"><font-awesome-icon icon="image-portrait" /></button>
        <button @click="changePhoto(user.id)" class="button btnDelete"><font-awesome-icon icon="check" /></button>
      </div>
    </div>
    <h2>Mes posts</h2>
    <Post :posts="postsUser" :getAllPost="getAllPostUser" />
  </div>
</template>


<script >
import Axios from "@/_services/caller.service.js";
import Post from "../components/Post.vue";
import { ref } from "vue";
import { accountService } from "../_services/account.service";
import Header from "@/components/Header.vue";

let locale = localStorage.getItem("user");
let localeUser = JSON.parse(locale);

export default {
  name: "Profil",
  components: {
    Post,
    Header,
  },
  data() {
    return {
      isActive: true,
      user: {},
      postsUser: [],
      newPseudo: "",
      newEmail: "",
      newImage: null,
      newDescription: "",
      newPassword: "",
      newPasswordVerif: "",
      userId: "",
    };
  },
  created() {
    this.getOneUser();
    this.getAllPostUser();
  },
  mounted() {
    let user = accountService.getLocalStorage();
    this.userId = user.user_id;
  },
  methods: {
    getAllPostUser() {
      Axios.get(`/post/postUser/${localeUser.user_id}`).then((res) => (this.postsUser = res.data.data));
    },
    getOneUser() {
      Axios.get(`/users/${localeUser.user_id}`).then((res) => {
        this.user = res.data.data;
      });
    },
    deleteAccount(userId) {
      Axios.delete(`/users/${userId}`, { user_id: userId }).then(() => {
        this.$store.commit("logout");
        this.$router.push("/");
        this.$toast.show("Le compte vient d'être supprimé..");
      });
    },
    switchModify() {
      if (this.isActive == false) return (this.isActive = true);
      if (this.isActive == true) return (this.isActive = false);
    },
    changeMail(userId) {
      Axios.put(`/users/${userId}`, { email: this.newEmail }).then((res) => {
        this.getOneUser();
        this.$toast.success("Email modifier");
      });
    },
    changePseudo(userId) {
      Axios.put(`/users/${userId}`, { pseudo: this.newPseudo }).then((res) => {
        this.getOneUser();
        this.$toast.success("Peudo modifier")
      });
    },
    changePassword(userId) {
      if (this.newPassword === this.newPasswordVerif) {
        Axios.put(`/users/${userId}`, { password: this.newPassword }).then((res) => {
          this.getOneUser();
          this.$toast.success("Mot de passe modifier")
        });
      } else {
        this.$toast.alert("Les mots de passe ne sont pas identique")
      }
    },
    changeDescription(userId) {
      Axios.put(`/users/${userId}`, { descriptionUser: this.newDescription }).then((res) => {
        this.getOneUser();
        this.$toast.success("Description modifier avec succès")
      });
    },
    fileSelected(event) {
      this.newImage = event.target.files[0];
    },
    changePhoto(userId) {
      const params = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };
      const fD = new FormData();
      fD.append("user_id", userId);
      fD.append("file", this.newImage);
      Axios.put(`/users/${userId}`, fD, params).then(() => {
        this.getOneUser();
        this.$toast.success("Photo de profil modifier")
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";
p{
  font-weight: bold;
}

.mode {
  display: none;
}
h2 {
  margin-top: 15px;
  font-size: 3em;
  font-weight: bold;
  color: $grey;
  text-align: center;
  font-family: "Montserrat", sans-serif;
}
.card__modif {
  margin: 10px;
}
.nav__icon {
  width: 50px;
  height: 50px;
  // color: inherit;
  color: $grey;
}
@media screen and (max-width: 450px) {
  .button {
    width: auto;
  }
  h1 {
    font-size: 1.2em;
  }
  .card__profil{
    display: block;
  }
  .nav__icon {
    width: 25px;
    height: 25px;
  }
}
@media screen and (max-width: 670px) {
  * {
    font-size: 16px;
  }
  h1 {
    font-size: 2em;
  }
  h2{
    font-size: 1.5em;
  }
}
</style>