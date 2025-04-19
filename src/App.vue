<template>
  <main>
    <template v-for="activity in activities" :key="activity">
      <CountdownTimer :name="activity.name" :date="activity.date" :background="activity.background"
        :duration="activity.duration" :location="activity.location" />
    </template>
  </main>
</template>

<script setup lang="ts">
import CountdownTimer from './components/CountdownTimer.vue';
import type { Activity } from '@/models/Activity';
import activitiesData from "@/assets/activities.json";

const activities = activitiesData.data.map((activity) => {
  return <Activity>{
    name: activity.name,
    date: new Date(activity.date),
    background: activity.background,
    duration: activity.duration,
    location: activity.location,
  }
}).sort((a, b) => {
  return a.date.getTime() - b.date.getTime()
})
</script>
