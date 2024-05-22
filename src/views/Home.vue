<template>
  <div id="home">
    <ThreeMap></ThreeMap>
    <div id="hero" class="hero-home is-fullheight">

      <div class="hero-body">
        <div class="container container-home">
          <p class="title is-size-1-mobile is-size-0-tablet is-size-0-desktop mb-5">
            Hi, I'm Thomas
          </p>
          <p class="intro is-size-2-mobile is-size-1-tablet is-size-1-desktop">
            I write code<br>and craft pixels<br>out of Barcelona.<br>Also, coffee.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ThreeMap from "@/components/ThreeMap";

export default {
  name: "home",

  components: {
    ThreeMap,
  },
};
</script>
