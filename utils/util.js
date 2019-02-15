const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//时间戳转换时间格式

const formatDateTime = inputTime => {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

const timezone = dateString=>{
  var timezone = 8; //目标时区时间，东八区
  var offset_GMT = new Date(dateString).getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
  var nowDate = new Date(dateString).getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
  var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
  return targetDate;
}

//输入时间间隔
//dateString 时间格式
const timecell=dateString=>{
    var datetime = new Date(dateString).getTime();
    var outtime = new Date().getTime() - datetime;
    var minutes = outtime / 1000 / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var week = days / 7;
    if (week > 1) {
      outtime = parseInt(week) + "周前";
    } else if (days > 1) {
      outtime = parseInt(days) + "天前";
    } else if (hours > 1) {
      outtime = parseInt(hours) + "小时前";
    } else {
      outtime = parseInt(minutes) + "分钟前";
    }
    return outtime;
}
//获取两个坐标的直线距离
const getrange= (la1, lo1, la2, lo2)=> {
  var La1 = la1 * Math.PI / 180.0;
  var La2 = la2 * Math.PI / 180.0;
  var La3 = La1 - La2;
  var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
  s = s * 6378.137; //地球半径
  s = (Math.round(s * 10000) / 10000).toFixed(2);
  return s
}


module.exports = {
  formatTime: formatTime,
  formatDateTime: formatDateTime,
  timezone: timezone,
  timecell:timecell,
  getrange: getrange
}
