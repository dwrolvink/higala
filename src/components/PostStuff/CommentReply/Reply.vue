<template>
  <article class="media">
    <div class="media-left">
      <figure class="media-left">
        <p class="image is-24x24">
          <img src="@/assets/Avatars/Reply.png">
        </p>
      </figure>
    </div>
    <div class="media-content">
      <div class="content f6 has-text-grey">
        <p>
          <strong>{{ reply.replier }}</strong> <small class="ml2">{{ created }}</small>
          <br>
          <span class="f6 has-text-grey">
            {{ reply.content }}
          </span>
        </p>
      </div>

      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <button :class="['button', 'is-small', liked? 'is-dark': '']">
              <b-icon icon="thumb-up" size="is-small"></b-icon>
              <span>{{ amounts.likes }}</span>
            </button>
          </a>

          <a class="level-item">
            <button class="button is-small is-info" disabled>
              <b-icon icon="reply" size="is-small"></b-icon>
            </button>
          </a>
          <a class="level-item">
            <button class="button is-small">
              <b-icon icon="markdown"></b-icon>
            </button>
          </a>
        </div>
        <div class="level-right">
          <a class="level-item">
            <b-dropdown>
              <button class="button is-small is-rounded" slot="trigger">
                <b-icon icon="chevron-down"></b-icon>
              </button>

              <b-dropdown-item>Delete Reply</b-dropdown-item>
            </b-dropdown>
          </a>
        </div>
      </nav>
    </div>

  </article>
</template>

<script>
import moment from "moment";

export default {
  name: "Reply",
  props: ["reply"],
  data() {
    return {
      amounts: {
        likes: 56
      },
      liked: false,
      created: ""
    };
  },
  methods: {
    prettifyDate() {
      let created = moment(this.comment.created).fromNow();
      this.created = created;
    }
  }
};
</script>
