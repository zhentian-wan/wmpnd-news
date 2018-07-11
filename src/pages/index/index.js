const { API_NEWS_LIST, DEFAULT_CATEGORY, CATEGORY_MAPPING } = require('../../utils/constants.js');

const { formatTime } = require('../../utils/util.js')

Page({
  data: {
    list: [],
    categories: CATEGORY_MAPPING
  },
  onLoad() {
    this.getNews();
  },
  // Get news from API
  getNews(category = DEFAULT_CATEGORY) {
    wx.request({
      url: `${API_NEWS_LIST}`,
      data: {
        type: category
      },
      header: {
        'content-type': 'application/json'
      },
      success: (response) => {
        this.setData({
          list: response.data.result.map(r => ({
            ...r,
            date: formatTime(new Date(r.date))
          }))
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
  },
  onTapCategory(event) {
    const item = event.currentTarget.dataset.item;
    this.selectCategory(item);
    this.getNews(item.key);
  },
  selectCategory(item) {
    const selectedItem = {
      ...item,
      selected: !item.selected
    };
    const index = this.data.categories
      .findIndex(r => r.key === item.key);
    const categories = this.data.categories.map(
      r => ({
        ...r,
        selected: false
      })
    ).map(r => {
      if (r.key === item.key) {
        return selectedItem;
      } 
      return r;
    });
    this.setData({
      categories
    })
  }
})
