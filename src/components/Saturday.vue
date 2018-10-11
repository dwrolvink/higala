<template>
  <b-collapse class="card">
    <div slot="trigger" slot-scope="props" class="card-header">

      <div class="card-header-title">
        Is it Saturday?
      </div>
      <div class="card-header-icon">
        <b-icon
          :icon="props.open ? 'menu-up': 'menu-down'"
        >
        </b-icon>
      </div>
    </div>

    <div class="card-content">
      <p>
        <span class="has-text-weight-semibold">Current time</span> &rarr; {{ time.current }}
      </p>
      <p class="mt1">
        <span class="has-text-weight-semibold">Earliest Timezone (Kiribati/Kiritimati)</span> &rarr;
        {{ time.earliest }}
      </p>
      <p class="mt1">
        <span class="has-text-weight-semibold">Furthest Timezone (Baker Island Time)</span> &rarr;
        {{ time.late }}
      </p>
    </div>
    <div class="card-footer">
      <div class="card-footer-item">
        <p v-if="isItSaturday" class="has-text-weight-semibold has-text-success">
          Yes, it's Saturday. 
          <b-icon icon="emoticon-happy" size="is-small"></b-icon>
        </p>
        <p v-else class="has-text-weight-semibold mt2 has-text-danger">
          Nope, it isn't Saturday yet.
          <b-icon icon="emoticon-sad" size="is-small"></b-icon>
        </p>
      </div>
    </div>
  </b-collapse>
</template>

<script>
import moment from "moment";

export default {
  name: "Saturday",
  data() {
    return {
      time: {
        current: null,
        earliest: null,
        late: null
      },
      isItSaturday: false
    };
  },
  methods: {
    getTimings() {
      this.time.current = moment().format("dddd Do, LTS");
      this.time.earliest = moment()
        .utcOffset(+14)
        .format("dddd Do YYYY");
      this.time.late = moment()
        .utcOffset(-12)
        .format("dddd Do YYYY");
    },
    updateCurrentTime() {
      this.time.current = moment().format("dddd Do, LTS");
    },
    calculateSaturday() {
      let earliestDay = this.time.earliest.split(" ")[0];
      let furthestDay = this.time.late.split(" ")[0];
      if (earliestDay === "Saturday" || furthestDay === "Saturday") {
        this.isItSaturday = true;
      }
    }
  },
  created() {
    this.getTimings();
    this.calculateSaturday();
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  }
};
</script>
