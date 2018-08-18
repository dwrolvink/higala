<template>
  <v-app id="inspire" dark>
    <Navbar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>
