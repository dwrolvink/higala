<template>
  <section class="hero is-dark is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title is-size-1 has-text-weight-light has-text-left">
          Signup
        </h1>
        <h2 class="subtitle has-text-left">
          Join Konishi and help destroy the Zucc!
        </h2>
        <div class="columns">
          <div class="column">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-size-3 has-text-weight-light">
                  Why Konishi?
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  <div class="columns">
                    <div class="column">
                      <b-icon 
                        icon="currency-usd"
                        size="is-large"
                      >
                      </b-icon>
                    </div>
                    <div class="column is-three-quarters">
                      <span class="has-text-centered has-text-weight-semibold is-size-4">It's Free!</span>
                      <p class="has-text-centered has-text-weight-light">You don't need to pay a single dime to use Konishi and will stay that way,
                        it is also free as in freedom!</p>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <b-icon 
                        icon="code-tags"
                        size="is-large"
                      >
                      </b-icon>
                    </div>
                    <div class="column is-three-quarters">
                      <span class="has-text-centered has-text-weight-semibold is-size-4">Privacy!</span>
                      <p class="has-text-centered has-text-weight-light">
                        The code is free to snag and use for many different purpose and limited by proprietary licenses,
                        It is Licensed in GNU GPL v3
                      </p>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <b-icon 
                        icon="incognito"
                        size="is-large"
                      >
                      </b-icon>
                    </div>
                    <div class="column is-three-quarters">
                      <span class="has-text-centered has-text-weight-semibold is-size-4">Open Sauce!</span>
                      <p class="has-text-centered has-text-weight-light">
                        Unlike other social platforms, we do not condone malicious usage of user data, we are
                        just a passionate group of developers who enjoy not getting Zucc'd
                      </p>
                    </div>
                  </div>

                  <p class="has-text-left">
                    We are looking for contributors to help out and grow the community! If you are willing
                    to join the Konishi community click on the "Contribute" button on the Navigation bar.
                  </p>

                  <footer class="card-footer">
                    <a href="https://github.com/konishi-project/" class="card-footer-item" target="_blank">
                      Project Github
                    </a>
                    <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" class="card-footer-item" target="_blank">
                      GNU GPL v3 (License)
                    </a>
                  </footer>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="tile is-ancestor">
              <div class="tile is-vertical is-parent">
                <div class="tile is-child">
                  <div class="card">
                    <header class="card-header">
                      <p class="card-header-title is-size-3 has-text-weight-light">
                        Create a new account
                      </p>
                    </header>
                    <div class="card-content">
                      <div class="content">
                        <form ref="form">
                          <div class="columns">
                            <div class="column">
                              <b-field label="Email"
                                :type="errors.has('email') ? 'is-danger' : ''"
                                :message="errors.has('email') ? errors.first('email') : ''"
                              >
                                <b-input 
                                  type="email" 
                                  name="email"
                                  icon="email"
                                  v-model="email"
                                  v-validate="'required|email'"
                                  placeholder="zucc@soy.com"></b-input>
                              </b-field>
                            </div>
                            <div class="column">
                              <b-field label="Username"
                                :type="errors.has('username') ? 'is-danger' : ''"
                                :message="errors.has('username') ? errors.first('username') : ''"
                              >
                                <b-input 
                                  name="username"
                                  icon="account" 
                                  maxlength="15"
                                  v-model="username"
                                  v-validate="'required|min:4|max:15|alpha_num'"
                                ></b-input>
                              </b-field>
                            </div>
                          </div>

                          <div class="columns">
                            <div class="column">
                              <b-field label="First Name" 
                                :type="errors.has('firstName') ? 'is-danger' : 'is-warning'" 
                                :message="errors.has('firstName') ? errors.first('firstName') : 'Optional'"
                              >
                                <b-input 
                                  name="firstName"
                                  icon="alphabetical" 
                                  maxlength="20"
                                  v-model="firstName"
                                  v-validate="'min:2|max:25|alpha'"
                                ></b-input>
                              </b-field>
                            </div>
                            <div class="column">
                              <b-field label="Last Name"
                                :type="errors.has('last name') ? 'is-danger' : 'is-warning'" 
                                :message="errors.has('last name') ? errors.first('last name') : 'Optional'"
                              >
                                <b-input 
                                  name="last name"
                                  icon="sort-alphabetical" 
                                  maxlength="25"
                                  v-model="lastName"
                                  v-validate="'min:2|max:25|alpha'"
                                ></b-input>
                              </b-field>
                            </div>
                          </div>

                          <b-field label="Entry Key"
                            :type="errors.has('entry key') ? 'is-danger' : ''" 
                            :message="errors.has('entry key') ? errors.first('entry key') : ''"
                          >
                            <b-input 
                              icon="key"
                              name="entry key"
                              v-validate="'required'"
                              v-model="entryKey"
                            ></b-input>
                          </b-field>

                          <div class="columns">
                            <div class="column">
                              <b-field label="Password"
                                :type="errors.has('password') ? 'is-danger' : ''"
                                :message="errors.has('password') ? errors.first('password') : ''"
                              >
                                <b-input 
                                  name="password"
                                  ref="password"
                                  icon="textbox-password"
                                  type="password"
                                  v-model="password"
                                  v-validate="'required|max:255|min:8'"
                                ></b-input>
                              </b-field>
                            </div>
                            <div class="column">
                              <b-field label="Confirm Password"
                                :type="errors.has('confirm password') ? 'is-danger' : ''"
                                :message="errors.has('confirm password') ? errors.first('confirm password') : ''"
                              >
                                <b-input 
                                  name="confirm password"
                                  icon="check-all"
                                  v-model="confirmPassword"
                                  v-validate="'required|confirmed:password|max:255|min:8'"
                                  type="password"
                                ></b-input>
                              </b-field>
                            </div>
                          </div>
                        </form>
                      </div>
                      <footer class="card-footer">
                        <a class="card-footer-item" target="_blank" @click="loginPage">
                          Already have an account?
                        </a>
                        <a class="card-footer-item" @click="validate">
                          <button 
                            :disabled="errors.any()"
                            class="button is-primary is-medium">
                            <span>Join</span>
                            <b-icon icon="send" size="is-small"></b-icon>
                          </button>
                        </a>
                      </footer>
                    </div>
                  </div>
                </div>

                <div class="tile is-child">
                  <div class="card">
                    <header class="card-header">
                      <p class="card-header-title">
                        Entry key is "KonishiTesting"
                      </p>
                    </header>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      entryKey: "",
      quote: ""
    };
  },
  beforeMount() {
    this.checkLogin();
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  methods: {
    loginPage() {
      this.$router.push("/login");
    },
    validate() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submit();
        }
      });
    },
    submit() {
      axios
        .post(this.backendUrl + "/register", {
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
            this.successmsg();
          }
        })
        .catch(error => {
          let reason = error.response.data.reason;
          if (reason === "email") {
            this.toast("Email is already being used!", "is-danger");
          } else if (reason === "username") {
            this.toast("Username has already been taken!", "is-danger");
          } else if (reason === "key") {
            this.toast("Wrong entry key!", "is-danger");
          } else {
            this.toast("Uh oh! Something went wrong!", "is-danger");
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
    successmsg() {
      this.$snackbar.open({
        duration: 5000,
        message: "You have successfully registered, and you may now log in.",
        type: "is-success",
        position: "is-top",
        actionText: "Login",
        queue: true,
        onAction: () => {
          this.$router.push("/login");
        }
      });
    },
    checkLogin() {
      if (localStorage.access_token != null) {
        this.$router.push("/");
      }
    }
  }
};
</script>
