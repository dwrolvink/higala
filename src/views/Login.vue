<template>
  <div id="login">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex offset-xs3 xs6>
          <v-snackbar
            v-model="snackbar"
            top
            timeout="5000"
            :color="color"
          >
          {{ text }}
          <v-btn
            flat
            @click="snackbar = false"
          >Close</v-btn>
          </v-snackbar>
          <v-card class="elevation-5">
            <v-form ref="loginForm" v-model="valid" lazy-validation>
              <v-card-title primary-title class="display-1 font-weight-light">
                Login to Konishi
              </v-card-title>
              <v-layout row wrap>
                <v-card-title>
                  <v-flex xs12>
                    <v-text-field
                      label="Username"
                      prepend-icon="person"
                      required
                      v-model="username"
                      :rules="usernameRules"
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                      :type="showPassword ? 'text' : 'password'"
                      :rules="passwordRules"
                      v-model="password"
                      prepend-icon="vpn_key"
                      label="Password"
                      hint="At least 8 characters"
                      class="input-group--focused"
                      @click:append="showPassword = !showPassword"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-card-title>
              </v-layout>
              <v-card-actions>
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-btn 
                      flat 
                      color="deep-purple"
                      :disabled="!valid"
                      @click="login"
                    >
                      <v-icon>exit_to_app</v-icon>
                      <div class="ml-1">Login</div>
                    </v-btn>
                  </v-flex>
                  <v-flex xs6>
                    <v-btn flat color="green lighten-1">SignUp</v-btn>
                    <v-btn flat color="red accent-1">Forgot Password?</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      showPassword: false,
      valid: true,
      snackbar: false,
      text: null,
      color: null,
      username: null,
      password: null,
      usernameRules: [
        v => !!v || "Username is required",
        v =>
          (v && v.length <= 20) || "Username must be less than 20 characters",
        v => (v && v.length >= 3) || "Username must be more than 3 characters"
      ],
      passwordRules: [
        v =>
          (v && v.length >= 8) ||
          "Password must be atleast 8 characters or more"
      ]
    };
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    login() {
      if (this.username == null || this.password == null) {
        this.snackbar = true;
        this.text = "The fields are empty, fill those up.";
        this.color = "amber darken-2";
      } else {
        axios
          .post(this.backendUrl + "login", {
            username: this.username,
            password: this.password
          })
          .then(response => {
            if (response.data.success == true) {
              localStorage.access_token = response.data.access_token;
              // Redirect user to Home page.
              this.$store.state.loggedIn = true;
              this.$router.push({ name: "home" });
            }
          })
          .catch(error => {
            if (error.status == 404) {
              this.snackbar = true;
              this.text = "Incorrect username or password";
              this.color = "red lighten-2";
            }
          });
      }
    }, // Login end
    checkLogin() {
      if (localStorage.access_token != null) {
        this.$router.push("/");
      }
    }
  }
};
</script>
