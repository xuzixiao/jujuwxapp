//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    openid:"",
    havenew:false,
    nodata:false,
    userlocaltion:{
      lat:"",
      lon:""
    },
    pageNum:1,
    infolist:[],
    xialaload:false,
    nothave:false
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  push:function(){
    wx.getStorage({
      key: 'loginstate',
      success: function(res) {//已经登录时
        wx.navigateTo({
          url: '/pages/releaseactive/releaseactive',
        })
      },
      fail:function(res){//没有登录数据时
        app.globalData.logintogo = "/pages/releaseactive/releaseactive";
         wx.navigateTo({
            url: "/pages/authorize/authorize",
         })
      }
    })
  },
  getinfolist:function(type){
    var data={};
    if(type==undefined||type==""||type==null||type=='update'){//更新
      data={
        pageNum: 1,
        lat: this.data.userlocaltion.lat,
        lng: this.data.userlocaltion.lon
      }
      this.setData({
        pageNum:1
      })
    } else if (type == 'add'){//追加
      data = {
        pageNum: this.data.pageNum+1,
        lat: this.data.userlocaltion.lat,
        lng: this.data.userlocaltion.lon
      }
      this.setData({
        pageNum: this.data.pageNum+1
      })
    }
    var that=this;
    wx.request({
      url: app.requesturl + 'dynamic/findByPage',
      method:"POST",
      data: data,
      success:function(res){
        if(res.data.code=="100"){
          if (type == undefined || type == "" || type == null || type == 'update'){
            that.setData({
              infolist: res.data.data
            })
          } else if (type == 'add'){
            that.setData({
              infolist: that.data.infolist.concat(res.data.data),
              xialaload: false
            })
          }
        } else if (res.data.code == "002"){
          that.setData({
            nodata:true
          })
        }
      }
    })
  },
  onLoad: function () {
    //获取当前位置坐标
    wx.getLocation({
      success: function (res) {
        console.log(res);
        wx.setStorage({
          key: 'latitude',
          data: res.latitude
        })
        wx.setStorage({
          key: 'longitude',
          data: res.longitude
        })
      }
    })
    var that=this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openid: res.data
        })
      }
    })
    //位置信息
    wx.getStorage({
      key: 'latitude',
      success: function(res) {
        that.setData({
          'userlocaltion.lat': res.data
        })
      }
    })
    wx.getStorage({
      key: 'longitude',
      success: function (res) {
        that.setData({
          'userlocaltion.lon': res.data
        })
      }
    })
  },
  onReady:function(){
    this.getinfolist();
  },
  onPullDownRefresh:function(){//上拉刷新
    this.getinfolist("update");
  },
  onReachBottom:function(){//下拉加载
    this.setData({
      xialaload:true
    })
    var that=this;
    setTimeout(function(){
      that.getinfolist("add");
    },1000)
  }
})
