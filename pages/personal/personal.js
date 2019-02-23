// pages/personal/personal.js
const qiniuUploader  = require("../../state/qiniuUploader.js");
// 初始化七牛相关参数
function initQiniu(that) {
  var options = {
    uploadURL:"https://up-z1.qbox.me",
    region: 'NCN', // 华北区
    uptoken: that.data.qiniuToken,
    domain: 'http://17juju.club/',
    shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
  this.getToken()
  let that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        let userdata = res.data;
        let labels;
        userdata.labels == null ? labels = [] : labels = userdata.labels;
        that.setData({
          "userheadimg": userdata.avatarUrl,
          "userinfo.avatarUrl": userdata.avatarUrl,
          "userinfo.nickName": userdata.nickName,
          "userinfo.region": userdata.region,
          "userinfo.oftenDrinkAlcohol": userdata.oftenDrinkAlcohol,
          "userinfo.oftenDiscoPlace": userdata.oftenDiscoPlace,
          "userinfo.oftenRegion": userdata.oftenRegion,
          "userinfo.discoDeclaration": userdata.discoDeclaration,
          "userinfo.labels": labels,
          "userinfo.openId": userdata.openId
        })   
      },
    })
  },
//获取用户信息
  getuserInfo: function (openId){
    let that=this;
  wx.request({
    url: app.requesturl + 'payUser/detail?openId=' + openId,
    header: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    success:function(res){
      console.log(res);
      if (res.data.code=="100"){
        let userdata = res.data.data;
        app.globalData.userInfo = userdata;
        wx.setStorage({
          key: 'userInfo',
          data: userdata,
        })
        let labels;
        userdata.labels == null ? labels = []:labels = userdata.labels;
        that.setData({
          "userheadimg": userdata.avatarUrl,
          "userinfo.avatarUrl": userdata.avatarUrl,
          "userinfo.nickName": userdata.nickName,
          "userinfo.region": userdata.region,
          "userinfo.oftenDrinkAlcohol": userdata.oftenDrinkAlcohol,
          "userinfo.oftenDiscoPlace": userdata.oftenDiscoPlace,
          "userinfo.oftenRegion": userdata.oftenRegion,
          "userinfo.discoDeclaration": userdata.discoDeclaration,
          "userinfo.labels": labels
        })
      }else{
        wx.showModal({
          content: res.data.msg,
          showCancel: false
        })
      }
    },
    fail:function(res){
     console.log(res);
    }
  })
},
//获取七牛Token
getToken:function(){
  var that=this;
  wx.request({
    url: app.requesturl +'qiniuTool/getQiniuToken',
    method:"POST",
    header: {
      "Accept": "application/json;charset=UTF-8"
    },
    success:function(res){
      if(res.data.code=='100'){
        that.setData({
          qiniuToken:res.data.data.token
        })
      }else{
        wx.showToast({
          content: res.data.msg,
          showCancel: false
        })
      }
    },
    fail:function(){
      wx.showToast({
        content: "接口异常",
        showCancel: false
      })
    }
  })
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
//数据绑定
//所在地
  szd:function(e){
    let name = e.detail.value;
    this.setData({
      'userinfo.region':name
    })  
  },
//常喝的酒类
  chdj: function (e) {
    let name = e.detail.value;
    this.setData({
      'userinfo.oftenDrinkAlcohol': name
    })
  },
//蹦迪的场所
  bdcs: function (e) {
    let name = e.detail.value;
    this.setData({
      'userinfo.oftenDiscoPlace': name
    })
  },
//经常出没地
  cmd: function (e) {
    let name = e.detail.value;
    this.setData({
      'userinfo.oftenRegion': name
    })
  },
//蹦迪宣言
  bdxy: function (e) {
    let name = e.detail.value;
    this.setData({
      'userinfo.discoDeclaration': name
    })
  },
//保存
  seve:function(){
    let that=this;
    wx.request({
      url: app.requesturl + 'payUser/update',
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      data: that.data.userinfo,
      success: function (res) {
        if (res.data.code == "100") {
            wx.showToast({
              title: '修改成功',
            }) 
            setTimeout(function(){
              that.getuserInfo(that.data.userinfo.openId);
            },600)
        }else{
          wx.showModal({
            content: res.data.msg,
            showCancel: false
          })
        }
      }, 
      fail: function (res) {
        wx.showToast({
          title: '接口异常',
          showCancel: false
        })
      },
      complete: function () {

      }
    })
  },
//添加标签按钮
  addlabelbtn:function(){
    this.setData({
      addlabel:true
    })
  },
  //取消添加标签
  canceltips:function(){
    this.setData({
      addlabel:false,
      labelname: ""
    })
  },
  //添加标签按钮
  addtips:function(){
    if (this.data.labelname.length==0) {
      wx.showModal({
        content: '不能为空',
        showCancel: false
      })
      return;
    }
    if(this.data.labelname.length>6){
      wx.showModal({
        content: '标签不能超过6个字',
        showCancel: false
      })
      return;
    }
    let labelindex= parseInt(Math.random() * this.data.labelstyle.length);
    let newlabel = this.data.labelstyle[labelindex];
    newlabel.text=this.data.labelname;
    this.setData({
      'userinfo.labels': this.data.userinfo.labels.concat(newlabel),
      addlabel:false,
      labelname:""
    })
  },
// 标签名
labelval:function(e){
  var labelval=e.detail.value;
  this.setData({
    labelname:labelval
  })
},
//修改用户名
updateusernamefun:function(){
  this.setData({
    usernamewin:true
  })
},
//修改头像
updateimgfun:function(){
  this.setData({
    userimgwin:true
  })
},
//关闭按钮
  closewin:function(){
    this.setData({
      userimgwin: false,
      addlabel: false,
      usernamewin: false,
      labelname:"",
      nickName:"",
      userheadimg: this.data.userinfo.avatarUrl,
      imageObject:"",
      imageURL:""
    })
  },
//修改用户名文本框
  usernametext:function(e){
    this.setData({
      nickName: e.detail.value
    })
  },
//修改用户名
  updateusername:function(){
    if (this.data.nickName.length == 0) {
      wx.showModal({
        content: '不能为空',
        showCancel: false
      })
      return;
    }
    this.setData({
      'userinfo.nickName': this.data.nickName,
      usernamewin: false
    })
  },
  //选择图片
  chooseImage:function(e){
    var that=this;
    //初始化七牛
    initQiniu(that);
    // 微信 API 选文件
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        // 交给七牛上传
        qiniuUploader.upload(filePath, (res) => {
          that.setData({
            imageObject:res,
            'userheadimg': res.imageURL,
          })
        }, (error) => {
          console.error('error: ' + JSON.stringify(error));
        },null, (progress) => {
          console.log('上传进度', progress.progress)
          console.log('已经上传的数据长度', progress.totalBytesSent)
          console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
        }, cancelTask => that.setData({ cancelTask })
        );
      }
    })
  },
//修改头像操作按钮
  updateheadimgfun:function(){
    let newimgsrc = this.data.imageObject.imageURL
    if (newimgsrc == undefined){
      this.closewin();
      return;
    }
    this.setData({
      'userinfo.avatarUrl':newimgsrc
    })
    this.closewin();
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