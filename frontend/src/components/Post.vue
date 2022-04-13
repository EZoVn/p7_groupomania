<template>
  <div class="card">
    <div class="card__profil">
      <img class="card__profil--img" src="../assets/images/InZooPic.png" alt="Photo de profil" />
      <p class="card__title">@Vince par exemple</p>
    </div>

    <div>
      <p class="card__text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum
        hendrerit augue, id facilisis erat dapibus sed. Cras posuere nisi et
        felis congue, sed porttitor libero tincidunt. Sed eu fringilla turpis.
        In bibendum ante in ante dignissim, ut malesuada quam dignissim. Vivamus
        bibendum ullamcorper dui, ac placerat eros cursus vel. Donec blandit
        consectetur turpis sed ornare. Phasellus finibus, metus aliquet egestas
        ullamcorper, purus lorem fermentum ante, non lacinia risus tortor vel
        risus. Duis eu malesuada orci, ac placerat enim. Nullam interdum mauris
        at tellus cursus convallis. Morbi bibendum nunc sit amet ipsum blandit
        aliquet at et est. Phasellus a tempus ex, vitae suscipit purus. Nam
        velit magna, laoreet at congue a, iaculis ac ipsum. Sed iaculis tellus
        sit amet fermentum accumsan. Vestibulum sit amet tortor tellus. Ut
        porttitor convallis lectus vitae suscipit.
      </p>
      <img class="card__img" src="../assets/images/InZooPic.png" alt="description image" />
    </div>
    <div class="comment">
      <p>
        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
};
</script>

<style lang="scss">
.card {
  margin: 10px;
  padding: 10px;

  &__profil {
    display: flex;
    align-items: center;
    margin: 10px 0;

    &--img {
      width: 50px;
      height: 50px;
      margin-right: 5px;
      border-radius: 25px;
      object-fit: cover;
    }
  }

  &__post {
    border: 2px solid red;
  }

  &__text {
    font-family: "montserrat", sans-serif;
    margin-left: 60px;
  }

  &__img {
    width: 100%;
    margin: 10px 0;
    object-fit: cover;
  }

  &__comment {
    margin: 5px;
    border: 1px dashed blue;
  }
}
</style>