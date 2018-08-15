export default {
  getCurrentTime: function getCurrentTime (type) {
    var date = new Date()
    var month = date.getMonth() + 1

    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    var hours = date.getHours()
    if (hours >= 0 && hours <= 9) {
      if (hours === 0) {
        hours = '00'
      } else {
        hours = '0' + hours
      }
    }
    var minutes = date.getMinutes()
    if (minutes >= 0 && minutes <= 9) {
      if (minutes === 0) {
        minutes = '00'
      } else {
        minutes = '0' + minutes
      }
    }
    var seconds = date.getSeconds()
    if (seconds >= 0 && seconds <= 9) {
      if (seconds === 0) {
        seconds = '00'
      } else {
        seconds = '0' + seconds
      }
    }
    var year = date.getFullYear()
    var currentdate = ''
    if (type && type === 'year') {
      currentdate = {year: year, month: Number(month)}
    } else if (type && type === 'hour') {
      currentdate = hours + ':' + minutes + ':' + seconds
    } else if (type && type === 'date') {
      currentdate = {year: year, month: Number(month), day: Number(strDate)}
    }
    return currentdate
  }
}
