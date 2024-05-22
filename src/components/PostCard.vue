<template>
  <div class="post-card">
    <router-link :to="'/project/' + slug">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="image" alt="Placeholder image" />
          </figure>
        </div>

        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-5 mb-0">{{ title }}</p>

              <div class="content">
                <p>{{ snippet }}</p>

                <div class="">
                  <a class="is-size-7"
                    >View Project <i class="fas fa-angle-double-right"></i
                  ></a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    title: String,
    date: String,
    snippet: String,
    image: String,
    slug: String,
    type: String,
  },
};
</script>



