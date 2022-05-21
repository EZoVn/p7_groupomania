import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare, faPen, faUserPen, faXmark, faTrash, faCircleUser, faHouseChimneyUser, faImage, faPlay, faImagePortrait, faArrowLeftLong, faRightFromBracket, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Toaster from "@meforma/vue-toaster";

library.add(faPenToSquare, faPen, faUserPen, faXmark, faTrash, faCircleUser, faHouseChimneyUser, faImage, faPlay, faImagePortrait, faArrowLeftLong, faRightFromBracket, faCheck);

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Toaster, {
  position: "top",
  duration: 1000
});
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')