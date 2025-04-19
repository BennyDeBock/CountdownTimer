<template>
  <template v-if="showActivity">
    <div class="hero" :style="{
      backgroundImage: `linear-gradient(rgba(0,0,0,.5), 
    rgba(0,0,0,.5)), url(${activity.background})`
    }">
      <h1>{{ activity.name }}</h1>
      <div class="timebox">
        <div class="time">
          <h2>{{ Days }}</h2>
          <p>Days</p>
        </div>
        <div class="time">
          <h2>{{ Hours }}</h2>
          <p>Hours</p>
        </div>
        <div class="time">
          <h2>{{ Minutes }}</h2>
          <p>Minutes</p>
        </div>
        <div class="time">
          <h2>{{ Seconds }}</h2>
          <p>Seconds</p>
        </div>
      </div>
      <h3>{{ date }}</h3>
      <button class="button" @click="AddEventToCalendar(activity)">Add to calendar</button>
    </div>
  </template>
</template>

<script async setup lang="ts">
import { AddEventToCalendar } from '@/helpers/CalendarHelper';
import CalculateTimeRemaining from '@/helpers/Countdown';
import type { Activity } from '@/models/Activity';
import { computed, onBeforeUnmount, ref } from 'vue';

// Setup for activity
const activity = defineProps<Activity>()

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

// Initialize time upon creation of object
const countdown = CalculateTimeRemaining(activity)
days.value = countdown.days
hours.value = countdown.hours
minutes.value = countdown.minutes
seconds.value = countdown.seconds

// Computed properties for display
const showActivity = computed(() => activity.date.getTime() - new Date().getTime() > 0 ? true : false)
const Days = computed(() => days.value < 10 ? `0${days.value}` : days.value)
const Hours = computed(() => hours.value < 10 ? `0${hours.value}` : hours.value)
const Minutes = computed(() => minutes.value < 10 ? `0${minutes.value}` : minutes.value)
const Seconds = computed(() => seconds.value < 10 ? `0${seconds.value}` : seconds.value)

const timeFormat: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}
const date = `${activity.date.toLocaleDateString("nl-BE", timeFormat)}`

// Run update of properties
const interval = setInterval(() => {
  const countdown = CalculateTimeRemaining(activity)

  days.value = countdown.days
  hours.value = countdown.hours
  minutes.value = countdown.minutes
  seconds.value = countdown.seconds
}, 1000)

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.hero {
  background-image: linear-gradient(rgba(0, 0, 0, .5),
      rgba(0, 0, 0, .5)), url();
}

h1 {
  font-size: 4rem;
}

.timebox {
  gap: 90px;
}

.time h2 {
  font-size: 5rem;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  h1 {
    font-size: 1.5rem;
  }

  .timebox {
    gap: 20px;
  }

  .time h2 {
    font-size: 2.5rem;
  }
}
</style>