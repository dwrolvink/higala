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
          <a class="navbar-item is-active">
            Support
          </a>
          <a class="navbar-item" @click="contribute">
            Contribute
          </a>
          <a v-if="loggedIn" class="navbar-item" @click="logout">
            Logout
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      burgerActive: false,
      menuActive: false,
      loggedIn: null
    };
  },
  beforeMount() {
    this.checkLogin();
  },
  methods: {
    showMenu() {
      this.burgerActive = !this.burgerActive;
      this.menuActive = !this.menuActive;
    },
    contribute() {
      this.$router.push("/contribute");
    },
    checkLogin() {
      if (localStorage.access_token == null) {
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
      }
    },
    goHome() {
      this.$router.push("/");
    },
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("currentuser");
      this.loggedIn = false;
      this.$router.push("/login");
    }
  }
};
</script>
