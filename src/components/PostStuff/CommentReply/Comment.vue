<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-32x32">
        <img src="https://api.adorable.io/avatars/40/commenter.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>BabuVandesh20</strong> <small class="ml2">31m</small>
          <br>
          <span class="f6 has-text-grey">
            <truncate clamp="..." 
              :length="90" 
              less="Show less"
              text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam consequatur facilis, nostrum fugiat impedit veniam fugit id consequuntur inventore sunt."
            ></truncate>
          </span>
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <button :class="['button', 'is-small', liked? 'is-dark': '']" @click="likeComment">
              <b-icon icon="thumb-up" size="is-small"></b-icon>
              <span>{{ amountOfLikes }}</span>
            </button>
          </a>

          <a class="level-item">
            <button class="button is-small is-info" disabled>
              <b-icon icon="comment" size="is-small"></b-icon>
              <span>WIP</span>
            </button>
          </a>
        </div>
        <div class="level-right">
          <a class="level-item">
            <button class="button is-small">
              <b-icon icon="markdown"></b-icon>
            </button>
          </a>
          <a class="level-item">
            <button class="button is-small is-rounded">
              <b-icon icon="chevron-down"></b-icon>
            </button>
          </a>
        </div>
      </nav>
    </div>
  </article>
</template>

<script>
import truncate from "vue-truncate-collapsed";
export default {
  name: "Comment",
  components: {
    truncate
  },
  data() {
    return {
      amountOfLikes: 0,
      liked: false
    };
  },
  methods: {
    likeComment() {
      if (this.liked) {
        this.liked = false;
        this.amountOfLikes = this.amountOfLikes - 1;
      } else {
        this.liked = true;
        this.amountOfLikes = this.amountOfLikes + 1;
      }
    }
  }
};
</script>
