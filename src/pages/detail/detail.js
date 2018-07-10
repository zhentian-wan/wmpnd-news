const { API_NEWS_DETAIL } = require('../../utils/constants.js');

Page({
  data: {
    details: ''
  },
  onLoad(options) {
    const id = options.id;
    if(id !== null) {
      this.getDetail(id);
    } else {
      // Show no content
    }
  },
  onPullDownRefresh () {
  
  },
  // Load detail API
  getDetail (id) {
    wx.request({
      url: `${API_NEWS_DETAIL}`,
      data: {
        id
      },
      header: {
        'content-type': 'application/json'
      },
      success: (response) => {
        this.setData({
          details: response.data.result
        })
      }
    });
  }
})