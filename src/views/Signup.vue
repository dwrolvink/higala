<template>
   <div id="signup">
     <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
     <v-container>
      <v-snackbar
        v-model="snackbar"
        top
        :color="snackbarColor"
      >
      {{ text }}
      <v-btn
        flat
        @click="snackbar = false"
      >Close</v-btn>
      </v-snackbar>
      <v-snackbar
        v-model="successBar"
        top
        :color="snackbarColor"
      >
      {{ text }}
      <v-btn
        flat
        @click="goToLogin"
      >Login</v-btn>
      </v-snackbar>
      <v-layout row wrap>
        <v-flex xs6>
          <v-container>
            <v-card dark class="elevation-5">
              <v-card-title primary-title class="display-1 font-weight-light">
                Why Konishi
                <i class="fas fa-heart ml-2 mr-2" style="font-size: 10px"></i> ?
              </v-card-title>
              <v-divider></v-divider>

              <v-card-title>
                <v-container>
                  <v-layout row wrap>
                    <v-flex xs3>
                      <i class="fas fa-hand-holding-usd" style="font-size: 5rem;"></i>
                    </v-flex>
                    <v-flex xs9>
                      <p class="text-xs-center title font-weight-medium">It's Free!</p>
                      <p class="text-xs-center subheading font-weight-light">
                        You don't need to pay a single dime to use Konishi and will stay that way, it is 
                        also free as in freedom!
                      </p>
                    </v-flex>
                    <v-flex xs3>
                      <i class="fas fa-file-code" style="font-size: 5rem;"></i>
                    </v-flex>
                    <v-flex xs9>
                      <p class="text-xs-center title font-weight-medium">Open Sauce!</p>
                      <p class="text-xs-center subheading font-weight-light">
                        The code is free to snag and use without having to be limited by rules!
                        It is licensed in GNU's GPL v3
                      </p>
                    </v-flex>
                    <v-flex xs3>
                      <i class="fas fa-user-secret" style="font-size: 5rem;"></i>
                    </v-flex>
                    <v-flex xs9>
                      <p class="text-xs-center title font-weight-medium">Privacy!</p>
                      <p class="text-xs-center subheading font-weight-light">
                        Unlike other social media, we don't sell or maliciously use your
                        data without permission. We're a very passionate group and mainly do this for fun
                        and to help others.
                      </p>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-title>
            </v-card>
          </v-container>
        </v-flex>
        <v-flex xs6>
          <v-container>
            <v-card class="elevation-5">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-title primary-title class="display-1 font-weight-light">
                  Sign Up
                </v-card-title>
                <v-layout row wrap>
                    <v-card-title>
                      <v-flex xs6>
                        <v-text-field
                          label="Email"
                          prepend-icon="email"
                          required
                          v-model="email"
                          :rules="emailRules"
                        >
                        </v-text-field>
                      </v-flex>

                      <v-flex xs6>
                        <v-text-field
                          label="Username"
                          prepend-icon="person"
                          required
                          v-model="username"
                          :rules="usernameRules"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                          label="First Name"
                          prepend-icon="face"
                          required
                          v-model="firstName"
                          :rules="nameRules"
                        >
                        </v-text-field>
                      </v-flex>

                      <v-flex xs6>
                        <v-text-field
                          label="Last Name"
                          prepend-icon="sort_by_alpha"
                          required
                          v-model="lastName"
                          :rules="nameRules"
                        >
                        </v-text-field>
                      </v-flex>

                      <v-flex xs12>
                        <v-text-field
                          :rules="passwordRules"
                          type="password"
                          v-model="password"
                          prepend-icon="lock"
                          label="Password"
                          hint="At least 8 characters"
                          class="input-group--focused"
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12>
                        <v-text-field
                          :rules="passwordRules"
                          type="password"
                          v-model="confirmPassword"
                          prepend-icon="lock_open"
                          label="Confirm Password"
                          class="input-group--focused"
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12>
                        <v-text-field
                          :rules="[ v => !!v || 'An entry key is needed to join Konishi']"
                          prepend-icon="vpn_key"
                          v-model="entryKey"
                          label="Entry Key"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-card-title>
                </v-layout>
                <v-card-actions>
                  <v-btn 
                    dark 
                    block 
                    flat 
                    color="pink lighten-2"
                    @click="goToLogin"
                  >
                  I have an account
                  </v-btn>
                  <v-btn 
                    block 
                    flat
                    color="cyan"
                    :disabled="!valid"
                    @click="submit"
                  >
                    <v-icon class="mr-2">send</v-icon>
                    Join
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
            <v-card class="elevation-5 mt-2">
              <v-card-title 
                primary-title
                class="title"
              >
              <v-icon class="mr-2">vpn_key</v-icon> 
              Entry key is "KonishiTesting"
              </v-card-title>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
     </v-container>
   </div> 
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      backendUrl: "http://localhost:4000/",
      valid: true,
      snackbar: false,
      successBar: false,
      snackbarColor: "",
      text: "",
      email: "",
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+/.test(v) || "Email must be valid"
      ],
      firstName: "",
      lastName: "",
      nameRules: [
        v => !!v || "First name is required",
        v => (v && v.length >= 2) || "Name must not be less than 2 characters",
        v => (v && v.length <= 15) || "Name must not exceed 15 characters"
      ],
      username: "",
      usernameRules: [
        v => !!v || "Username is required",
        // eslint-disable-next-line
        v => (v && v.length >= 2) || "Username must not be less than 2 characters",
        v => (v && v.length <= 15) || "Username must not exceed 20 character"
      ],
      msg: "",
      password: "",
      confirmPassword: "",
      passwordRules: [
        v => !!v || "Required!",
        v => v.length >= 8 || "Atleast 8 characters",
        v => v.length <= 255 || "Max allowed characters is 255"
      ],
      entryKey: ""
    };
  }, // Data end
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    submit() {
      if (this.$refs.form.validate()) {
        // Check if passwords match.
        if (this.password != this.confirmPassword) {
          this.snackbar = true;
          this.snackbarColor = "red lighten-1";
          this.text = "Passwords don't match!";
        } else {
          axios
            .post(this.backendUrl + "register", {
              email: this.email,
              username: this.username,
              first_name: this.firstName,
              last_name: this.lastName,
              password: this.password,
              confirm_password: this.confirmPassword,
              entry_key: this.entryKey
            })
            .then(response => {
              if (response.data.success === true) {
                this.$refs.form.reset();
                this.successBar = true;
                this.snackbarColor = "success";
                this.text = "You are now signed up, click login to continue";
              }
            })
            .catch(error => {
              var reason = error.response.data.reason;
              var status = error.response.status;
              if (reason === "email" && status === 403) {
                this.snackbar = true;
                this.snackbarColor = "red lighten-1";
                this.text = "This email is used on another account";
              } else if (reason === "username" && status === 403) {
                this.snackbar = true;
                this.snackbarColor = "red lighten-1";
                this.text = "This username has already been taken";
              } else if (reason === "key" && status === 406) {
                this.snackbar = true;
                this.snackbarColor = "red lighten-1";
                this.text = "Please provide a proper entry key";
              }
            });
        }
      }
    } // Submit End
  }
};
</script>
