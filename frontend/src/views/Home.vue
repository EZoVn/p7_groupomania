<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data: function () {
    return {
      mode: 'login',
      pseudo: '',
      email: '',
      password: '',
      passwordVerif: '',
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == 'create') {
        if (this.pseudo != '' && this.email != '' && this.password != '') return true;
        else return false;
      } else {
        if (this.email != '' && this.password != '') return true;
        else return false;
      }
    },
    ...mapState(['status'])

  },
  methods: {
    switchCreateAccount: function () {
      this.mode = 'create';
    },
    switchLogin: function () {
      this.mode = 'login';
    },
    createAccount: function () {
      if (this.password != this.passwordVerif) {
        return console.error('Mot de passe non identique');
      }
      this.$store.dispatch('createAccount', {
        pseudo: this.pseudo,
        email: this.email,
        password: this.password,
      })
    },
    login: function () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      })
    }
  }
}
</script>

<template>
  <div class="card">
    <h1 v-if="mode == 'login'" class="card__title">Connexion</h1>
    <h1 v-else class="card__title">Inscription</h1>
    <p v-if="mode == 'login'" class="card__subtitle">Tu n'as pas encore de compte ? <span class="card__action"
        @click="switchCreateAccount()">Créer un compte</span></p>
    <p v-else class="card__subtitle">Tu as déjà un compte ? <span class="card__action" @click="switchLogin()">Se
        connecter</span></p>
    <div class="form-row">
      <input v-model="pseudo" v-show="mode != 'login'" class="form-row__input" type="text" placeholder="Pseudo" />
    </div>
    <div class="form-row">
      <input v-model="email" class="form-row__input" type="email" placeholder="Adresse mail" />
    </div>
    <div class="form-row">
      <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe">
    </div>
    <div class="form-row">
      <input v-if="mode == 'create'" v-model="passwordVerif" class="form-row__input" type="password"
        placeholder="Vérification mot de passe">
    </div>
    <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
      Adresse mail déjà utilisée
    </div>
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

</template>

<style lang="scss">
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
  min-width: 100px;
  color: black;

  &::placeholder {
    color: #aaaaaa;
  }
}
</style>
