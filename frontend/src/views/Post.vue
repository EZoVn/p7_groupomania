<script setup>
import Post from "../components/Post.vue";


</script>

<template>
    <section>
        <div class="card">
            <!-- <input type="text" id="" class="card__newPost" placeholder="Quoi de neuf ?"/> -->
            <textarea name="newPost" class="card__newPost" id="" placeholder="Quoi de neuf ?" cols="30" rows="10"></textarea>
            <div class="btn">

                <button name="ajoutPhoto" class="button">Ajouter une photo</button>
            <!-- emoji  -->
            <!-- gif -->
            <button class="button">Envoyer</button>
            </div>
        </div>

        <Post />
        <Post />
        <Post />

        <!-- <div class="card">
            <div class="card__post">
                <p class="card__title">@Vince2</p>
                <p class="card__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum hendrerit
                    augue, id
                    facilisis erat dapibus sed. Cras posuere nisi et felis congue, sed porttitor libero tincidunt. Sed
                    eu fringilla
                    turpis. In bibendum ante in ante dignissim, ut malesuada quam dignissim. Vivamus bibendum
                    ullamcorper dui, ac
                    placerat eros cursus vel. Donec blandit consectetur turpis sed ornare. Phasellus finibus, metus
                    aliquet egestas
                    ullamcorper, purus lorem fermentum ante, non lacinia risus tortor vel risus. Duis eu malesuada orci,
                    ac placerat
                    enim. Nullam interdum mauris at tellus cursus convallis. Morbi bibendum nunc sit amet ipsum blandit
                    aliquet at
                    et
                    est. Phasellus a tempus ex, vitae suscipit purus. Nam velit magna, laoreet at congue a, iaculis ac
                    ipsum. Sed
                    iaculis tellus sit amet fermentum accumsan. Vestibulum sit amet tortor tellus. Ut porttitor
                    convallis lectus
                    vitae
                    suscipit.</p>
                <img class="card__img" src="imageUrl" alt="description image">
            </div>

            // Afficher tous les commentaires
            <div class="card__comment">
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
            </div>
        </div> -->
    
    </section>

</template>

<style lang="scss" scoped>

.btn{
    display: flex;
    flex-direction: row;
    // justify-content:space-between;

}
.button {
    margin: 0 20px ;
}
.card{
    width: 100%;
    &__newPost{
        margin-bottom: 10px;
        height: 100px;
        width: 100%;
        padding: 10px;
        border-radius: 16px;
    }
}
</style>