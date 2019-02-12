// components/infolist/infolist.js
Component({
  /**
   * 组件的属性列表
   */
  
  properties: {
    'infordata': {
      type: Object,
    },
    'lat':{
      type:String
    },
    'lon':{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    infordata:"",
    outtime:"",
    showdel:false,
    distance:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getouttime:function(){
      var datetime = new Date(this.properties.infordata.createTime).getTime();
      var outtime = new Date().getTime() - datetime;
      var minutes = new Date(outtime).getMinutes();
      var hours = new Date(outtime).getHours();
      var days = hours / 24;
      //console.log(days, hours, minutes);
      if (days > 1) {
        outtime = parseInt(days) + "天前";
      } else if (hours > 1) {
        outtime = parseInt(hours) + "小时前";
      } else {
        outtime = parseInt(minutes) + "分钟前";
      }
      this.setData({
        outtime: outtime
      })
    },
    showdelfun: function () {//删除显示
      if (this.properties.openid == this.properties.infordata.createUser.openId){
        this.setData({
          showdel:true
        })
      }else{
        this.setData({
          showdel: false
        })
      }
    },
    getdistance: function (la1, lo1, la2, lo2){
        var La1 = la1 * Math.PI / 180.0;
        var La2 = la2 * Math.PI / 180.0;
        var La3 = La1 - La2;
        var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
        s = s * 6378.137; //地球半径
        s = (Math.round(s * 10000) / 10000).toFixed(2);
        return s
    }
  },
  ready:function(){
    this.getouttime();
    this.showdelfun();
    var juli = this.getdistance(this.properties.infordata.lat, this.properties.infordata.lng, this.properties.lon, this.properties.lat);
    this.setData({
      distance: juli+"km"
    })
  }
})
