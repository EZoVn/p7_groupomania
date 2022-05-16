import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from "@fortawesome/fontawesome-svg-core";
import {faPenToSquare,faPen ,faUserPen, faXmark, faTrash, faCircleUser, faHouseChimneyUser, faImage, faPlay, faImagePortrait, faBookOpen, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faPenToSquare,faPen, faUserPen,faXmark, faTrash, faCircleUser, faHouseChimneyUser, faImage, faPlay, faImagePortrait, faBookOpen, faRightFromBracket);

const app = createApp(App)

app.use(router)
app.use(store)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
