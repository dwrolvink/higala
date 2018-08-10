<template>
  <v-navbar>
    <v-navigation-drawer
      persistent
      :right="right"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      color="deep-purple lighten-2"
      dark
    >
    <router-link to="/">
      <v-toolbar-title>
          <img src="@/assets/Logos/Brand.png" alt="" height="40"> 
      </v-toolbar-title>
    </router-link>

      <v-spacer></v-spacer>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-navbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      drawer: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      right: true,
    }
  },
}
</script>
