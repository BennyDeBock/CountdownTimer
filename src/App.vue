<template>
  <main>
    <template v-for="activity in activities">
      <CountdownTimer :name="activity.name" :date="activity.date" :background="activity.background"/>
    </template>
  </main>
</template>

<script setup lang="ts">
import CountdownTimer from './components/CountdownTimer.vue';
import type { Activity } from '@/models/Activity';
import activitiesData from "@/assets/activities.json";

const activities = activitiesData.data.map((activity) => {
  return <Activity> {
    name: activity.name,
    date: new Date(activity.date),
    background: activity.background
  }
}).sort((a, b) => {
  return a.date.getTime() - b.date.getTime()
  })
</script>
