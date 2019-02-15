// components/activelist/activelist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    "activedata":{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activedata:{},
    date:"",
    week:"",
    time:"",
  },

  /**
   * 组件的方法列表
   */
  methods: {
  
  },
  ready: function () {
    let createdate = this.properties.activedata.ginTime;//项目开始时间
    let week = new Date(createdate).getDay();
    let date = createdate.split("T")[0];
    if(week==1){
      week="周一"
    } else if (week == 2){
      week = "周二"
    } else if (week == 3) {
      week = "周三"
    } else if (week == 4) {
      week = "周四"
    } else if (week == 5) {
      week = "周五"
    } else if (week == 6) {
      week = "周六"
    } else if (week == 7) {
      week = "周日"
    }
    let time = createdate.split("T")[1].split(".")[0].substr(0, 5);
    this.setData({
      date: date,
      week:week,
      time:time
    })

  }
})
