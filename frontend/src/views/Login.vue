<script>
import { mapState } from "vuex";
import Header from "@/components/Header.vue";
import { accountService } from "../_services/account.service";

export default {
  name: "Home",
  components: {
    Header,
  },

  data: function () {
    return {
      mode: "login",
      pseudo: "",
      email: "",
      password: "",
      passwordVerif: "",
    };
  },
  mounted() {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/profil");
      return;
    }
  },
  computed: {
    validatedFields() {
      if (this.mode == "create") {
        if (this.pseudo != "" && this.email != "" && this.password != "") {
          return true;
        }
        return false;
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        }
        return false;
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    switchCreateAccount() {
      this.mode = "create";
    },
    switchLogin() {
      this.mode = "login";
    },
    createAccount() {
      let verifMail = accountService.validEmail(this.email);
      let verif = accountService.verifPassword(this.password, this.passwordVerif);
      if (verif && verifMail) {
        this.$store.dispatch("createAccount", {
          pseudo: this.pseudo,
          email: this.email,
          password: this.password,
        });
        this.$toast.success("Le compte a été créer !");
        this.mode = "login";
        this.password = "";
      }
    },
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$toast.show("Bienvenue");
          this.$router.push("/post");
        });
    },
  },
};
</script>

<template>
  <div>
    <Header />
    <div class="card">
      <h1 v-if="mode == 'login'" class="card__title">Connexion</h1>
      <h1 v-else class="card__title">Inscription</h1>
      <p v-if="mode == 'login'" class="card__subtitle">Tu n'as pas encore de compte ? <span class="card__action" @click="switchCreateAccount()">Créer un compte</span></p>
      <p v-else class="card__subtitle">Tu as déjà un compte ? <span class="card__action" @click="switchLogin()">Se connecter</span></p>
      <div class="form-row">
        <input v-model="pseudo" v-show="mode != 'login'" class="form-row__input" type="text" placeholder="Pseudo" />
      </div>
      <div class="form-row">
        <input v-model="email" class="form-row__input" type="email" placeholder="Adresse mail" />
      </div>
      <div class="form-row">
        <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe" />
      </div>
      <div class="form-row">
        <input v-if="mode == 'create'" v-model="passwordVerif" class="form-row__input" type="password" placeholder="Vérification mot de passe" />
      </div>
      <div class="form-row" v-if="mode == 'login' && status == 'error_login'">Adresse mail et/ou mot de passe invalide</div>
      <div class="form-row" v-if="mode == 'create' && status == 'error_create'">Adresse mail déjà utilisée</div>
      <div class="form-row">
        <button v-if="mode == 'login'" @click="login()" class="button" :class="{ 'button--disabled': !validatedFields }">
          <span v-if="status == 'loading'">Connexion en cours...</span>
          <span v-else>Connexion</span>
        </button>
        <button v-else @click="createAccount()" class="button" :class="{ 'button--disabled': !validatedFields }">
          <span v-if="status == 'loading'">Création en cours...</span>
          <span v-else>Créer mon compte</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";
h1 {
  margin-bottom: 10px;
}
.error {
  color: $red;
}
.deconnexion {
  display: none;
}
.card {
  width: auto;
  &__title {
    text-align: center;
    font-weight: 800;
  }
  &__subtitle {
    text-align: center;
    color: #666;
    font-weight: 500;
  }
  &__action {
    color: #2196f3;
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
}

.button {
  &--disabled {
    background: $grey;
    color: #ececec;

    &:hover {
      cursor: not-allowed;
      background: $red;
    }
  }
}
.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}

.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  // min-width: 100px;
  color: black;

  &::placeholder {
    color: #aaaaaa;
  }
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
}
</style>
