// pages/joinlist/joinlist.js
const app = getApp();
import utils from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid:"",
    userjoinlist:[],
    outtime:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.joinpeople(options.uuid);
    this.setData({
      uuid: options.uuid
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
    this.setData({
      userjoinlist:[],
    })
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
  joinpeople: function (uuid) {
    var that = this;
    wx.request({
      url: app.requesturl + 'payUser/findByPageOnActivity?uuid=' + uuid,
      method: "POST",
      data: {
        uuid: uuid
      },
      success: function (res) {
        if (res.data.code == "100") {
            let joinlen=res.data.data.length;
            let joindata = res.data.data;
            if(joinlen!=0){
              for (let i = 0; i<joinlen;i++){
                let outtime = utils.timecell(joindata[i].createTime);
                joindata[i].outtime = outtime
              }
              that.setData({
                userjoinlist: joindata
              })
              return;
            }
            that.setData({
              userjoinlist: []
            })




         
        }
      }
    })
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