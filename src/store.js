import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    access_token: "",
    posts: [
      {
        creator_name: "Zeth leonardo",
        username: "X1Zeth2X",
        profilepic:
          "https://github.com/konishi-project/higala/blob/master/src/components/Navbar.vue",
        created: "Aug 4th, 9:31 PM",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in sem quis dolor vulputate sollicitudin. Pellentesque eu felis nunc. Aenean bibendum risus tempor, posuere risus porttitor, facilisis metus. Proin blandit, turpis eget suscipit facilisis, mi lorem laoreet lorem, et placerat nibh velit ut tortor.",
        likes: 302
      },
      {
        creator_name: "Babu Jandeer Vrisha",
        username: "babvuj",
        profilepic:
          "https://avatars1.githubusercontent.com/u/37819251?s=200&v=4",
        created: "Sep 25th, 10:38 AM",
        content:
          "Send cod and bobs dear! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in sem quis dolor vulputate sollicitudin. Pellentesque eu felis nunc. Aenean bibendum risus tempor, posuere risus porttitor, facilisis metus. Proin blandit, turpis eget suscipit facilisis, mi lorem laoreet lorem, et placerat nibh velit ut tortor.",
        likes: 21
      }
    ]
  },
  getters: {},
  mutations: {},
  actions: {
    login: function(username, password) {
      fetch('http://127.0.0.1:5000/login', {
        method: "POST",
        mode: "cors"
      });
    }
  }
});
