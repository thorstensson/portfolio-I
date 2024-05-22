import axios from "axios";

const Axios = axios.create({
  baseURL: "https://api.airtable.com/v0/appLloaN0zLS7yixB/Projects"
});

Axios.defaults.headers.common = { Authorization: `Bearer ` +  process.env.VUE_APP_AIRTOKEN };

export default {
  getProjects() {
    return Axios.get();
  },

  getProject(slug) {
    return Axios.get("?filterByFormula={Slug}='" + slug + "'");
  }
};


