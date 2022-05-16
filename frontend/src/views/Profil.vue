<template>
  <div>
    <div class="card">
      
      <!-- <ul>
        <li>{{ user.pseudo }}</li>
        <li>{{ user.email }}</li>
        <li>Courte description de l'utilisateur : {{ user.descriptionUser }}</li>
      </ul> -->
      <div class="card card__profil">
        <p class="card__profil--pseudo">{{ user.pseudo }}</p>
        <p class="card__profil--description">Email : {{ user.email }}</p>
      </div>
      <img class="card__profil--img" :src="user.imgUser" @click="tt" alt="Photo de profil" />
      <div class="card">
        <p class="card__profil--description">Description de l'utilisateur :</p>
        <br />
        {{ user.descriptionUser }}
      </div>
    </div>

    <button  @click="switchModify()" class="button btnDelete"><font-awesome-icon icon="user-pen" /></button>
    <button @click="deleteAccount(user.id)" class="button btnDelete">Supprimer le profil</button>

    <!-- Modification Account -->
    <div class="card" :class="{ mode: isActive }">
      <div class="card__modif">
        <input v-model="newPseudo" class="card__newPost" type="text" name="newpseudo" placeholder="Changer de pseudo ici " />
        <button @click="changePseudo(user.id)" class="button btnDelete">Changer le pseudo</button>
      </div>

      <div class="card__modif">
        <input v-model="newEmail" class="card__newPost" type="email" name="newEmail" placeholder="Modifier votre email " />
        <button @click="changeMail(user.id)" class="button btnDelete">change email</button>
      </div>

      <div class="card__modif">
        <input v-model="newPassword" class="card__newPost" type="password" name="newEmail" placeholder="Modifier votre mot de passe " />
        <input v-model="newPasswordVerif" class="card__newPost" type="password" name="newEmail" placeholder="Vérifier votre mot de passe " />
        <button @click="changePassword(user.id)" class="button btnDelete">Changer le mot de passe</button>
      </div>

      <div class="card__modif">
        <input v-model="newDescription" class="card__newPost" type="text" name="newDescription" placeholder="Modifier votre description " />
        <button @click="changeDescription(user.id)" class="button btnDelete">Changer la description</button>
      </div>

      <input ref="imgChange" type="file" @change="fileSelected" style="display: none" />
      <button @click="$refs.imgChange.click()" name="modifyPhoto" class="button btnDelete"><font-awesome-icon icon="image-portrait" /></button>
      <button @click="changePhoto(user.id)" class="button btnDelete">Changer la photo de profil</button>
    </div>

    <Post :posts="postsUser" :getAllPost="getAllPostUser" />
  </div>
</template>


<script >
import Axios from "@/_services/caller.service.js";
import Post from "../components/Post.vue";
import { ref } from "vue";
import { accountService } from "../_services/account.service";

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
        console.log(`Le compte ${userId} a été supprimer !`);
      });
    },
    switchModify() {
      if (this.isActive == false) return (this.isActive = true);
      if (this.isActive == true) return (this.isActive = false);
    },
    changeMail(userId) {
      Axios.put(`/users/${userId}`, { email: this.newEmail }).then((res) => {
        console.log(res);
        this.getOneUser();
      });
    },
    changePseudo(userId) {
      Axios.put(`/users/${userId}`, { pseudo: this.newPseudo }).then((res) => {
        console.log(res);
        this.getOneUser();
      });
    },
    changePassword(userId) {
      if (this.newPassword === this.newPasswordVerif) {
        Axios.put(`/users/${userId}`, { password: this.newPassword }).then((res) => {
          console.log(res);
          this.getOneUser();
        });
      } else {
        console.log("error mot de passe non identique");
      }
    },
    changeDescription(userId) {
      Axios.put(`/users/${userId}`, { descriptionUser: this.newDescription }).then((res) => {
        console.log(res);
        this.getOneUser();
      });
    },
    fileSelected(event) {
      this.newImage = event.target.files[0];
      console.log(this.newImage);
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
        console.log("L'utilisateur a été modifier avec succès !");
      });
    },
  },
};
</script>

<style lang="scss">
.mode {
  display: none;
}

.deconnexion {
  display: block;
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
</style>