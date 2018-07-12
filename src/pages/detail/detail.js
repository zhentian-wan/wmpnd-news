const { API_NEWS_DETAIL } = require('../../utils/constants.js');

Page({
  data: {
    details: '',
    selectedId: null
  },
  onLoad(options) {
    const id = options.id;
    if(id !== null) {
      this.setData({
        selectedId: id
      });
      this.getDetail(id);
    } else {
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },
  onPullDownRefresh () {
    this.getDetail(this.data.selectedId);
  },
  // Load detail API
  getDetail (id) {
    wx.showLoading({
      title: 'Loading...',
    });
    wx.request({
      url: `${API_NEWS_DETAIL}`,
      data: {
        id
      },
      header: {
        'content-type': 'application/json'
      },
      success: (response) => {
        wx.hideLoading();
        this.setData({
          details: response.data.result
        });
      },
      fail: () => {
        wx.hideLoading();
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      },
      complete: () => {
        wx.stopPullDownRefresh();
      }
    });
  }
})