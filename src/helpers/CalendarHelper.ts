import type { Activity } from '@/models/Activity'
import { createEvent, type EventAttributes } from 'ics'

function CreateCalendarEvent(activity: Activity): EventAttributes {
  const event: EventAttributes = {
    start: [
      activity.date.getFullYear(),
      activity.date.getMonth() + 1,
      activity.date.getDate(),
      activity.date.getHours(),
      activity.date.getMinutes(),
    ],
    duration: activity.duration,
    title: activity.name,
    location: activity.location,
  }

  return event
}

async function DownloadEvent(event: EventAttributes) {
  const filename = `${new Date().toString()} - ${event.title}.ics`
  const file: File = await new Promise((resolve, reject) => {
    createEvent(event, (error, value) => {
      if (error) {
        reject(error)
      }

      resolve(new File([value], filename, { type: 'text/calendar' }))
    })
  })
  const url = URL.createObjectURL(file)

  // trying to assign the file URL to a window could cause cross-site
  // issues so this is a workaround using HTML5
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename

  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)

  URL.revokeObjectURL(url)
}

export async function AddEventToCalendar(activity: Activity) {
  const event = CreateCalendarEvent(activity)
  await DownloadEvent(event)
}
