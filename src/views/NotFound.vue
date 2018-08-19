<template>
  <div id="404">
    <v-container>
      <v-layout row wrap>
        <v-flex offset-md3 md6 xs12>
          <v-card hover>
            <v-card-text class="display-1 font-weight-light text-xs-center">REeEeEeEeEe</v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <p class="display-1 font-weight-light text-xs-center">
                404 <i class="fab fa-linux fa-3x" style="color: grey;"></i> not found :'(
              </p>
              <p class="title text-xs-center font-weight-light">
                Are you lost muh frend? or you sneaking around looking for something?
              </p>
            </v-card-text>
            <v-card-actions>
              <v-tooltip bottom>
                <v-btn icon slot="activator" class="mr-2" @click="E">
                  <i class="fab fa-erlang fa-2x"></i>
                </v-btn>
                <span>e?</span>
              </v-tooltip>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <v-btn icon slot="activator" @click="UwU">
                  <span class="UwU">UwU</span>
                 </v-btn>
                 <span>OwO</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    E() {
      window.open("https://www.youtube.com/watch?v=4TbLqs92VKA");
    },
    UwU() {
      this.$router.push("/");
    }
  }
};
</script>

 <style scoped>
@import url("https://use.fontawesome.com/releases/v5.2.0/css/all.css");
.UwU {
  text-transform: none;
}
</style>
