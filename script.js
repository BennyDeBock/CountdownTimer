const Days = document.getElementById('days')
const Hours = document.getElementById('hours')
const Minutes = document.getElementById('minutes')
const Seconds = document.getElementById('seconds')

const targetDate = new Date("May 12 2025 18:30:00").getTime()

function timer() {
  const currentDate = new Date().getTime()
  const distance = targetDate - currentDate

  const days = Math.floor(distance/(1000*60*60*24))
  const hours = Math.floor(distance/(1000*60*60)) % 24
  const minutes = Math.floor(distance/(1000*60)) % 60
  const seconds = Math.floor(distance/1000) % 60

  Days.innerHTML = days >= 10 ? days : `0${days}`
  Hours.innerHTML = hours >= 10 ? hours : `0${hours}`
  Minutes.innerHTML = minutes >= 10 ? minutes : `0${minutes}`
  Seconds.innerHTML = seconds >= 10 ? seconds : `0${seconds}`

  if(distance < 0){
    Days.innerHTML = "00"
    Hours.innerHTML = "00"
    Minutes.innerHTML = "00"
    Seconds.innerHTML = "00"
  }
}

setInterval(timer, 1000)