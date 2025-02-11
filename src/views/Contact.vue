<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <p class="title is-size-2-mobile is-size-1-tablet is-size-1-desktop">Say Hello</p>
          <h2 class="title-invert is-size-1-mobile is-size-0-tablet is-size-0-desktop">
            It's good to talk.
          </h2>
        </div>
      </div>
    </section>
    <section class="section form-mobile">
      <div class="container" data-aos="flip-up">
        <div class="columns is-centered">
          <div class="column is-one-third">
            <div class="box">

              <!-- Form uses EmailJS, submit directive below ===================== -->
              <form id="contact-form" @submit.prevent="sendEmail">
                <!-- name -->
                <div class="field">
                  <label class="label">Name</label>
                  <input type="text" class="input" name="name" v-model="name" placeholder="Name" />
                </div>

                <!-- email -->
                <div class="field">
                  <label class="label">Email</label>
                  <input type="email" class="input" name="email" v-model="email" placeholder="Email" />
                </div>

                <div class="field">
                  <label class="label">Message</label>
                  <div class="control">
                    <textarea class="textarea" placeholder="Tell me" name="message" v-model="message"></textarea>
                  </div>
                </div>

                <!-- submit button -->
                <div class="field has-text-right">
                  <button type="submit" class="button">Post</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import emailjs from "emailjs-com";

export default {
  name: "contact",

  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },

  methods: {
    sendEmail(e) {
      try {
        emailjs.sendForm(
          "service_u2cxevi",
          "template_s4fzpf6",
          e.target,
          "user_zHaHExnwPOohTuZpTbubz",
          {
            name: this.name,
            email: this.email,
            message: this.message,
          }
        );
      } catch (error) {
        console.log({ error });
      }
      // Reset form field
      this.name = "";
      this.email = "";
      this.message = "";
    },
  },
};
</script>
