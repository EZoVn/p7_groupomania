<template>
  <div class="card ">
    <textarea v-model="post" name="newPost" class="card__newPost" id="" placeholder="Quoi de neuf ?" cols="30" rows="10"></textarea>
    <div class="btn">
      <input style="display: none" ref="imgInput" type="file" @change="onFileSelected" />
      <button @click="$refs.imgInput.click()" name="ajoutPhoto" class="button"><font-awesome-icon icon="image" /></button>
      <button class="button" @click="addPost()"><font-awesome-icon icon="play" /></button>
    </div>
  </div>
</template>

<script>
import Axios from "@/_services/caller.service";
import { accountService } from "../_services/account.service";
let user = accountService.getLocalStorage();

export default {
  name: "AddPost",
  data() {
    return {
      post: "",
      image: null,
    };
  },
  props: {
    getAllPost: { type: Function },
  },
  methods: {
    onFileSelected(event) {
      this.image = event.target.files[0];
    },
    addPost(event) {
      const formData = new FormData();
      formData.append("message", this.post);
      formData.append("user_id", user.user_id);
      formData.append("file", this.image);
      console.log(formData);
      Axios.post("/post", formData).then(() => {
        this.$toast.success(`Post envoyer avec succès !`);
        this.image = null;
        this.post = "";
        this.getAllPost();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card__newPost {
  margin-bottom: 10px;
  height: 100px;
  width: 100%;
  padding: 10px;
  border-radius: 16px;
}
.button{
  width: 100%;
}
</style>