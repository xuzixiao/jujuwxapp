// components/infolist/infolist.js
const app = getApp();
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

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
    }
    

  }
})
