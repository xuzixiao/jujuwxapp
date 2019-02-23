// components/infolist/infolist.js
const app = getApp();
import util from '../../utils/util.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'infordata': {
      type: Object,
    },
    'openId':{
      type:String
    },
    'distance': {
      type: String
    },
    'outtime': {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dianzan:false,
    active:"#c00",
    defult:"#97A9B8",
    infordata:"",
    openId:"",
    outtime:"",
    distance:"",
    showBimg:false,
    bimgindex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点赞
    praise:function(){
      var praisedata={
        uuid:this.data.infordata.uuid,
        openId: this.data.openId
      }
      console.log(praisedata);
      var that=this;
      wx.request({
        url: app.requesturl + '/dynamic/praise?uuid=' + this.data.infordata.uuid + "&openId=" + this.data.openId,
        method:"POST",
        success:function(res){
          console.log(res);
          if(res.data.code=="100"){
            var dianzan = !dianzan;
            that.setData({
              dianzan: dianzan
            })
          }
        }
      })
    },
    //时间间隔
    timecell:function(){
      let outtime = util.timecell(this.properties.infordata.createTime);
      this.setData({
        outtime: outtime
      })
    },
    //距离间隔
    julijiange:function(){
      debugger;
      var juli = util.getrange(this.properties.infordata.lat, this.properties.infordata.lng, this.properties.lat, this.properties.lon);
    },
    //关闭预览
    closeoutlook:function(){
      this.setData({
        showBimg:false
      })
    },
    //打开预览
    showbigimglook:function(e){
      let imgindex = e.currentTarget.dataset.imgindex;
      this.setData({
        bimgindex: imgindex,
        showBimg: true
      })
    },
    //转发
    share:function(){
      this.triggerEvent("share");
    }
  }
})
