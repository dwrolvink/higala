<template>
  <div id="app">
    <Navbar class="mb-2"/>
    <div id="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>
