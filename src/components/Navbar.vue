<template>
  <nav class="navbar is-dark">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/">
          <a class="navbar-item">
            <img src="@/assets/Brand.png" alt="Logo">
          </a>
        </router-link>
        <span 
          class="navbar-burger burger" 
          data-target="navbarMenu"
          :class="[burgerActive? 'is-active' : '']"
          @click="showMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div 
        id="navbarMenu" 
        class="navbar-menu" 
        :class="[menuActive? 'is-active' : '']"
        @click="showMenu"
      >
        <div class="navbar-end">
          <a class="navbar-item is-active" @click="contribute">
            Contribute
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      burgerActive: false,
      menuActive: false
    };
  },
  computed: {
    ...mapState(["loggedIn"])
  },
  methods: {
    showMenu() {
      this.burgerActive = !this.burgerActive;
      this.menuActive = !this.menuActive;
    },
    contribute() {
      this.$router.push("/contribute");
    },
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>
