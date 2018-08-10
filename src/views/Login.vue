<template>
  <div id="login">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex offset-xs3 xs6>
          <v-card class="elevation-5">
            <v-card-title primary-title class="display-1 font-weight-light">
              Login to Konishi
            </v-card-title>
            <v-layout row wrap>
              <v-card-title>
                <v-flex xs12>
                  <v-text-field
                  label="Username"
                  prepend-icon="person"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    :type="showPassword ? 'text' : 'password'"
                    prepend-icon="vpn_key"
                    label="Password"
                    hint="At least 8 characters"
                    class="input-group--focused"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-flex>
              </v-card-title>
            </v-layout>
            <v-card-actions>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-btn flat color="deep-purple">
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
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
      return {
        showPassword: false
      }
    }
};
</script>
