//app.js
App({
  onLaunch: function () {
    var that=this;
    wx.getLocation({
      success: function (res) {
        let userlocaltion={
          lat: res.latitude,
          lon: res.longitude
        }
        that.globalData.userlocaltion = userlocaltion;
        if (that.employIdCallback) {
          that.employIdCallback(userlocaltion);
        }
      }
    })
  },
  requesturl:"https://www.17juju.club/party-service-system/",
  globalData: {
    userInfo: null,
    userlocaltion:"",
    logintogo:""
  }
})