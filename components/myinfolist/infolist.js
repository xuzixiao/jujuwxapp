// components/infolist/infolist.js
const app = getApp();
import util from '../../utils/util.js';
import Dialog from '../../vant/dialog/dialog';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'infordata': {
      type: Object,
    },
    'index':{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    index:"",
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
      wx.request({
        url: app.requesturl + '/dynamic/praise?uuid=' + this.data.infordata.uuid + "&openId=" + this.data.openId,
        method:"POST",
        success:function(res){
          console.log(res);
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
    delinfo:function(){
      
      let uuid = this.data.infordata.uuid;
      var that=this;      
      wx.showModal({
        title: '删除提示',
        content: '确定要删除此条动态吗？',
        showCancel: true,//是否显示取消按钮
        cancelText: "否",//默认是“取消”
        cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "是",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            wx.request({
              url: app.requesturl + 'dynamic/delete?uuid=' + that.data.infordata.uuid + "&openId=" + app.globalData.userInfo.openId,
              method:"POST",
              data:{
                uuid: that.data.infordata.uuid,
                openId: that.data.openId
              },
              success:function(res){
                if(res.data.code=="100"){
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                  })
                  var index = that.data.index; //通过这个传递数据
                  var myEventDetail = {
                    index: index
                  }
                  that.triggerEvent('myevent', myEventDetail);
                }
              }
            })
          }
        }
      })
    }
  }
})
