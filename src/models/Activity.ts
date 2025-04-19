export interface Activity {
  name: string
  date: Date
  duration: {
    hours: number
    minutes: number
  }
  location: string
  background: string
}

export interface DateVariables {
  days: number
  hours: number
  minutes: number
  seconds: number
}
