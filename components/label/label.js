// components/label.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: String,
    color: String,
    background: String
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

  },
  onReady: function () {
    console.log(this.text);
  }
})
