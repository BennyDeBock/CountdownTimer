<template>
  <template v-if="showActivity">
    <div class="hero" :style="{backgroundImage: `linear-gradient(rgba(0,0,0,.5), 
    rgba(0,0,0,.5)), url(${activity.background})`}">
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
    </div>
  </template>
</template>

<script setup lang="ts">
import type { Activity } from '@/models/Activity';
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';

// Setup for activity
const activity = defineProps<Activity>()

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

// Computed properties for display
const showActivity = computed(() => activity.date.getTime() - new Date().getTime() > 0 ? true : false)
const Days = computed(() => days.value < 10 ? `0${days.value}` : days.value)
const Hours = computed(() => hours.value < 10 ? `0${hours.value}` : hours.value)
const Minutes = computed(() => minutes.value < 10 ? `0${minutes.value}` : minutes.value)
const Seconds = computed(() => seconds.value < 10 ? `0${seconds.value}` : seconds.value)

// Run update of properties
const interval = setInterval(() => {
    const currentDate = new Date()
    const distance = activity.date.getTime() - currentDate.getTime()

    days.value = Math.floor(distance/(1000*60*60*24))
    hours.value = Math.floor(distance/(1000*60*60)) % 24 == 0 ? 0 : Math.floor(distance/(1000*60*60)) % 24
    minutes.value = Math.floor(distance/(1000*60)) % 60 == 0 ? 0 : Math.floor(distance/(1000*60)) % 60
    seconds.value = Math.floor(distance/1000) % 60 == 0 ? 0 : Math.floor(distance/1000) % 60

    if(distance < 0){
      days.value = 0
      hours.value = 0
      minutes.value = 0
      seconds.value = 0
    }
  }, 1000)

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.hero{
  background-image: linear-gradient(rgba(0,0,0,.5), 
  rgba(0,0,0,.5)), url();
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

  .time h2{
    font-size: 2.5rem;
  }
}
</style>