// components/infolist/infolist.js
import util from '../../utils/util.js';
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
      let outtime = util.timecell(this.properties.infordata.createTime);
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
    }
  },
  ready:function(){
    this.getouttime();
    this.showdelfun()
    var juli = util.getrange(this.properties.infordata.lat, this.properties.infordata.lng, this.properties.lat, this.properties.lon);
    this.setData({
      distance: juli+" km"
    })
  }
})
