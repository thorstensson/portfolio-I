<template>
  <div id="app">
    <div id="wrapper">
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <nav class="navbar is-transparent is-spaced is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link class="" to="/">
            <p class="navbar-item name-title is-size-5" href="#">
              &#10085;T
            </p>
          </router-link>

          <a role="button" id="navbarBurger" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
            data-target="navbarBasic" :class="{ 'is-active': showNav }" @click="showNav = !showNav">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasic" class="navbar-menu" :class="{ 'is-active': showNav }">
          <div class="navbar-end">
            <router-link to="/" exact class="navbar-item">Home</router-link>
            <router-link to="/about" class="navbar-item">About</router-link>
            <router-link to="/projects" class="navbar-item">Projects</router-link>
            <router-link to="/contact" class="navbar-item">Contact</router-link>
          </div>
        </div>
      </nav>

      <transition mode="out-in" enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut">
        <router-view></router-view>
      </transition>
      <FxNoise />
    </div>

    <footer class="footer" data-aos="fade-in" data-aos-anchor-placement="top-bottom">
      <div class="content has-text-right">
        <span class="is-size-7">I am a really old portfolio; I now don't agree with the code, UI, or style, and I dont have loaders!</span>
        <span class="icon">
          <a href="https://linkedin.com/in/thomasthorstensson" target="_blank"><i
              class="fa-brands fa-linkedin fa-lg"></i></a>
        </span>
        <span class="icon">
          <a href="https://thomasthorstensson.photography" target="_blank"><i class="fas fa-camera fa-lg"></i></a>
        </span><br />
      </div>
    </footer>
  </div>
</template>

<script>
import FxNoise from "@/components/FxNoise";

export default {
  name: "App",
  components: {
    FxNoise
  },
  data() {
    return {
      showNav: false,
    };
  },
  mounted() {
    const links = document.querySelectorAll(".navbar-item");

    var vm = this;
    links.forEach((link) => {
      link.addEventListener("click", function () {
        vm.showNav = false;
      });
    });
  },
  created() {
    window.addEventListener("resize", this.listenToResize);
    this.listenToResize();
  },

  methods: {
    listenToResize() {
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  },
};
</script>

<style>
@import "app.css";
</style>
