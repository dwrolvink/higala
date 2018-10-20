<template>
  <section class="hero is-dark is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-white">Login</h3>
            <p class="subtitle has-text-white">Please login to proceed.</p>
            <div class="box mt5">
              <figure class="avatar">
                <img src="@/assets/Logo.png">
              </figure>
              <div class="mb4 mt1">
                Zucc can no longer watch.
              </div>
              <form ref="loginForm">
                <b-field custom-class="is-medium" 
                  :type="errors.has('username') ? 'is-danger': ''"
                  :message="errors.has('username') ? errors.first('username') : ''"
                >
                  <b-input 
                    @keyup.native.enter="validate"
                    name="username"
                    v-model="username"
                    size="is-medium"
                    placeholder="Username"
                    v-validate="'required|min:3|max:15|alpha_num'"
                   ></b-input>
                </b-field>
                <b-field custom-class="is-medium" class="pb3"
                  :type="errors.has('password') ? 'is-danger': ''"
                  :message="errors.has('password') ? errors.first('password') : ''"
                >
                  <b-input 
                    @keyup.native.enter="validate"
                    type="password" 
                    name="password"
                    size="is-medium" 
                    placeholder="Password"
                    v-validate="'required|min:8|max:255'"
                    v-model="passwordContent"
                    password-reveal></b-input>
                </b-field>
              </form>
              <button 
                class="button is-block is-danger is-medium is-fullwidth mb2" 
                @click="validate"
                :disabled="errors.any()"
              >Login</button>
            </div>
          <router-link to="/signup">
            <a class="button is-block is-primary is-medium">Sign Up</a>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      passwordContent: ""
    };
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  beforeMount() {
    this.checkLogin();
  },
  methods: {
    validate() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.login();
        }
      });
    },
    login() {
      axios
        .post(this.backendUrl + "/login", {
          username: this.username,
          password: this.passwordContent
        })
        .then(response => {
          if (response.status === 200) {
            // Store the access token
            let user = response.data.currentuser;
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem(
              "currentuser",
              JSON.stringify({
                id: user.id,
                bio: user.bio,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                roles: user.roles,
                joined_date: user.joined_date
              })
            );
            // Once saved, get the current user's information
            this.goHome();
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.toast("Incorrect username or password!", "is-danger");
          } else if (error.response.status === 401) {
            this.toast("Incorrect username or password!", "is-danger");
          } else {
            this.toast("Uh oh! Something went wrong", "is-danger");
          }
        });
    },
    toast(msg, type) {
      this.$toast.open({
        duration: 3000,
        message: msg,
        type: type
      });
    },
    checkLogin() {
      if (localStorage.access_token != null) {
        this.goHome();
      }
    },
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
</style>
