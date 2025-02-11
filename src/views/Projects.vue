<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="is-size-2-mobile is-size-1-tablet is-size-1-desktop">
            Work
          </h1>
          <h2 class="is-size-1-mobile is-size-0-tablet is-size-0-desktop">
            Current and past.
          </h2>
        </div>
      </div>
    </section>

    <section class="section is-small is-below-hero">
      <div class="container">
        <div class="columns is-left">
          <div class="column is-half is-size-5-desktop">
            <p>Have a read.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <transition-group tag="div" class="columns is-multiline" name="staggered-fade" v-bind:css="false"
          v-on:before-enter="beforeEnter" v-on:enter="enter">
          <div class="column is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
            v-for="(project, index) in projects" v-bind:key="project.id" v-bind:data-index="index">
            <post-card v-bind="project"></post-card>
          </div>
        </transition-group>
      </div>
    </section>
  </div>
</template>

<style type="text/css"></style>

<script>
import ProjectsService from "@/services/ProjectsService";
import PostCard from "@/components/PostCard";
import Velocity from "velocity-animate";

export default {
  name: "projects",
  components: {
    PostCard,
  },

  data() {
    return {
      airtableResponse: [],
    };
  },

  mounted: function () {
    let self = this;
    async function getProjects() {
      try {
        const response = await ProjectsService.getProjects();
        self.airtableResponse = response.data.records;
      } catch (err) {
        console.log(err);
      }
    }
    getProjects();
  },

  computed: {
    projects() {
      let self = this;
      let projectList = [];
      for (var i = 0; i < self.airtableResponse.length; i++) {
        if (self.airtableResponse[i].fields.Published) {
          let project = {
            title: self.airtableResponse[i].fields.Title,
            date: self.airtableResponse[i].fields["Date Published"],
            snippet: self.airtableResponse[i].fields.Excerpt,
            image: self.airtableResponse[i].fields.Image[0].url,
            slug: self.airtableResponse[i].fields.slug,
            type: self.airtableResponse[i].fields.type,
            index: i,
            id: i,
          };
          projectList.push(project);
        }
      }
      return projectList;
    },
  },

  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0;
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150;
      setTimeout(function () {
        Velocity(el, { opacity: 1 }, { complete: done });
      }, delay);
    },
  },

  destroyed: function () {
    //document.body.style.background = "#0a0a0a";
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
