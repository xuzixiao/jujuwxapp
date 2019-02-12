// pages/personal/personal.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uuid:"",
    createuser:"",
    qiniuToken:"",
    imageObject:"",
    labelstyle:[
      {"backgroundColor": "#ffd8bf", "textColor": "#ff7a45" },
      {"backgroundColor": "#bae7ff", "textColor": "#1890ff" },
      {"backgroundColor": "#ffd5e7", "textColor": "#f759ac" },
      {"backgroundColor": "#d9f7be", "textColor": "#52c41a" },
      {"backgroundColor": "#B5F5EC", "textColor": "#13C2C2" }, 
      {"backgroundColor": "#EFDBFF", "textColor": "#9254DE" },
    ],
    userimgwin:false,
    addlabel:false,
    usernamewin:false,
    userheadimg: "",
    labelname:"",
    username:"",
    userinfo: {
      "openId":"",
      "avatarUrl":"",//头像
      "nickName":"",//昵称
      "region":"",//所在地
      "oftenDrinkAlcohol":"",//常喝的酒类
      "oftenDiscoPlace":"",//蹦迪的场所
      "oftenRegion":"",//经常出没地
      "discoDeclaration":"",//蹦迪宣言
      "labels":[]//我的标签
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //获取openid
  let that=this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          "userinfo.openId":res.data,
          uuid: options.uuid
        })
        //获取用户信息
        that.getdetail(res.data,options.uuid);
      }
    })
  },
//获取动态详情
getdetail:function(openid,uuid){
  var that=this;
  wx.request({
    url: app.requesturl + 'dynamic/detail?openid=' + openid+"&uuid="+uuid,
    method:"POST",
    success:function(res){
      if(res.data.code=="100"){
        that.setData({
          createuser: res.data.data.createUser
        })
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})