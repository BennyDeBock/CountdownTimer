import type { Activity, DateVariables } from '@/models/Activity'

export default function CalculateTimeRemaining(activity: Activity): DateVariables {
  const currentDate = new Date()
  const distance = activity.date.getTime() - currentDate.getTime()

  const countdown = <DateVariables>{
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  if (distance < 0) return countdown

  countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24))
  countdown.hours =
    Math.floor(distance / (1000 * 60 * 60)) % 24 == 0
      ? 0
      : Math.floor(distance / (1000 * 60 * 60)) % 24
  countdown.minutes =
    Math.floor(distance / (1000 * 60)) % 60 == 0 ? 0 : Math.floor(distance / (1000 * 60)) % 60
  countdown.seconds = Math.floor(distance / 1000) % 60 == 0 ? 0 : Math.floor(distance / 1000) % 60

  return countdown
}
