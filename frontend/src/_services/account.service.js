import Axios from "@/_services/caller.service";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  duration: 3000,
  position: "top",
});

let logout = () => {
  this.$store.commit('logout');
  this.$router.push('/');
};

let getLocalStorage = () => {
  let locale = localStorage.getItem('user');
  let user = JSON.parse(locale);
  return user;
}
const validEmail = (inputEmail) => {
  // creation de la reg exp validation email
  let emailRegExp = new RegExp(
    `^[a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}$`, 'g'
  );
  if (emailRegExp.test(inputEmail)) {
    return inputEmail
  } else {
    toaster.error(`L'email est incomplet. Exemple : monEmail@mail.fr`);
  }
};
const verifPassword = (pass, verifPass) => {
  if (pass != verifPass) {
    toaster.error("Les mots de passes ne sont pas identique");
  } else if (pass.length < 8) {
    toaster.error("Le mot de passe ne contient pas assez de caractères. Entre 8 et 35max");
  } else if (!/[A-Z]/.test(pass)) {
    toaster.error("Il faut une lettre majuscule minimum");
  } else if (!/[a-z]/.test(pass)) {
    toaster.error("Il faut une lettre minuscule minimum");
  } else if (!/[0-9]/.test(pass)) {
    toaster.error("Il faut un chiffre minimum");
  } else if (!/[!"#$%&'()*+,./:;<=>?@\^_`{|}~-]/.test(pass)) {
    toaster.error("Il faut un symbole minimum");
  }
  else return pass && verifPass;
}
export const accountService = {
  logout,
  getLocalStorage,
  validEmail,
  verifPassword,
}