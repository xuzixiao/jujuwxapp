const app = getApp();
const qiniuUploader = require("../../state/qiniuUploader.js");
import Toast from '../../vant/toast/toast';
// 初始化七牛相关参数
function initQiniu(that) {
  var options = {
    uploadURL: "https://up-z1.qbox.me",
    region: 'NCN', // 华北区
    uptoken: that.data.qiniuToken,
    domain: 'http://17juju.club/',
    shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    openId:"",
    qiniuToken:"",
    showtypechoose:false,
    actions:[
      { typeid:1,
        name: '上传图片'
      },{
        typeid:2,
        name:"上传视频"
      }
    ],
    releasetext:"",
    wordlen:0,
    puactivedata:{
      characters:"",
      lat:"",
      lng:"",
      medias:[],
      place:"",
      uuid:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getToken();
    var that=this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openId: res.data
       })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //获取七牛Token
  getToken: function () {
    var that = this;
    wx.request({
      url: app.requesturl + 'qiniuTool/getQiniuToken',
      method: "POST",
      header: {
        "Accept": "application/json;charset=UTF-8"
      },
      success: function (res) {
        if (res.data.code == '100') {
          that.setData({
            qiniuToken: res.data.data.token
          })
        } else {
          wx.showToast({
            content: res.data.msg,
            showCancel: false
          })
        }
      },
      fail: function () {
        wx.showToast({
          content: "接口异常",
          showCancel: false
        })
      }
    })
  },

  releasetextfun:function(e){
    this.setData({
      wordlen: e.detail.cursor,
      'puactivedata.characters': e.detail.value
    })
  },
  uploadimg:function(){
    this.setData({
      showtypechoose:true
    })
  },
  onClose() {
    this.setData({ showtypechoose: false });
  },
  onSelect(event) {
    this.setData({
      showtypechoose:false
    })
    var that = this;
    initQiniu(that);
    if(event.detail.typeid==1){
      wx.chooseImage({//上传图片
        success: function(res) {
          //初始化七牛
          var fillpaths = res.tempFilePaths;
          var qiniuimgpath=[];
          for(let i=0;i<fillpaths.length;i++){
            qiniuUploader.upload(fillpaths[i], (res) => {
              console.log(res);
              let imggroup={
                "filePath": res.imageURL,
                "fileType": "0",
                "index": i+1,
              }
              that.setData({
                'puactivedata.medias': that.data.puactivedata.medias.concat(imggroup) 
              })
            }, (error) => {
              console.error('error: ' + JSON.stringify(error));
            }, null, (progress) => {
              console.log('上传进度', progress.progress)
              console.log('已经上传的数据长度', progress.totalBytesSent)
              console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
            }, cancelTask => that.setData({ cancelTask })
            );
          }
          //console.log(qiniuimgpath);  
        },
      })
    }else if(event.detail.typeid==2){
      wx.chooseVideo({//上传视频
        success:function(res){
          var fillpaths = res.tempFilePath;
          console.log(fillpaths);
          qiniuUploader.upload(fillpaths, (res) => {
            console.log(res);
            let imggroup = {
              "filePath": res.imageURL,
              "fileType": "1",
              "index": that.data.puactivedata.medias.length + 1,
            }
            that.setData({
              'puactivedata.medias': that.data.puactivedata.medias.concat(imggroup)
            })
          }, (error) => {
            console.error('error: ' + JSON.stringify(error));
          }, null, (progress) => {
            console.log('上传进度', progress.progress)
            console.log('已经上传的数据长度', progress.totalBytesSent)
            console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
          }, cancelTask => that.setData({ cancelTask })
          );
        }
      })
    }
  },
//获取位置信息
getlocaltion:function(){

 var that=this;
  wx.chooseLocation({
    success:function(res){
      console.log(res);
      that.setData({
          'puactivedata.place': res.name,
          'puactivedata.lat':res.latitude,
        'puactivedata.lng': res.longitude
      })
    }
  })



},
  seve:function(){
    if(this.data.puactivedata.characters==""){
      Toast("动态主题内容不能为空");
      return;
    }
    if (this.data.puactivedata.medias.length == 0) {
      Toast("请您上传图片或者视频");
      return;
    }
    if (this.data.puactivedata.medias.lat == "" || this.data.puactivedata.medias.lng=="") {
      Toast("请您获取位置信息");
      return;
    }
    wx.request({
      url: app.requesturl + '/dynamic/save?openId=' + this.data.openId,
      method:"POST",
      data: this.data.puactivedata,
      success:function(res){
        if(res.data.code=="100"){
          Toast("发布成功");
          wx.navigateBack({
            delta: -1
          });     
        }else{
          Toast(res.data.data);
        }
      }
    })



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