const { API_NEWS_LIST, DEFAULT_CATEGORY, CATEGORY_MAPPING } = require('../../utils/constants.js');

Page({
  data: {
    list: [],
    categories: CATEGORY_MAPPING
  },
  onLoad() {
    this.getNews();
  },
  // Get news from API
  getNews() {
    wx.request({
      url: `${API_NEWS_LIST}`,
      data: {
        type: `${DEFAULT_CATEGORY}`
      },
      header: {
        'content-type': 'application/json'
      },
      success: (response) => {
        this.setData({
          list: response.data.result
        })
      }
    })
  },
  // Navigate to detail view
  openDetail(row) {
    const newsItem = row.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${newsItem.id}`
    })
  }
})
