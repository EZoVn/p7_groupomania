<script>
export default {
  name: 'Home',
  data: function () {
    return {
      mode: 'login',
      pseudo: '',
      email: '',
      password: '',
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
    }

  },
  methods: {
    switchCreateAccount: function () {
      this.mode = 'create';
    },
    switchLogin: function () {
      this.mode = 'login';
    },
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
      <button v-if="mode == 'login'" class="button" :class="{'button--disabled' : !validatedFields}">Connexion</button>
      <button v-else class="button" :class="{'button--disabled' : !validatedFields}">Créer mon compte</button>
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
