<template>
  <div id="create" class="mb-4">
    <v-card>
      <v-card-title
      class="title font-weight-light"
      primary-title
      ><v-icon class="mr-1">edit</v-icon> Create a post
      </v-card-title>
      <v-card-title>
        <v-layout row wrap>
          <v-flex xs1>
              <img :src="userImage" height="35px" class="mt-2">
          </v-flex>
          <v-flex xs11>
            <v-textarea
            outline
            label="Post content"
            auto-grow
            row-height="5"
            >
            </v-textarea>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-actions>
        <v-btn flat block color="blue darken-1">Post</v-btn>
        <v-btn flat color="blue darken-1">
          <v-icon>image</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
  data() {
    return {
      userImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Antu_distributor-logo-gentoo.svg/1024px-Antu_distributor-logo-gentoo.svg.png"
    };
  }
};
</script>
