const { API_NEWS_DETAIL } = require('../../utils/constants.js');

const { strong, div, p, img, formatTime } = require('../../utils/util.js');

Page({
  data: {
    details: '',
    nodes: '',
    date: '',
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
        const nodes = this.transformRichText(response.data.result.content);
        this.setData({
          details: response.data.result,
          nodes,
          date: formatTime(
            new Date(response.data.result.date)
            )
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
  },
  transformRichText(contents) {
    const head = '<div style="font-size: 15px">';
    const htmlContent = contents.reduce((acc, curr) => {
      acc += this.generateHTML(curr);
      return acc;
    }, '');
    const tail = '</div>';
    return `${head}${htmlContent}${tail}`;
  },
  generateHTML(obj) {
    if(!obj) return '';
    const {type, text = '', src = ''} = obj;
    switch(type) {
      case 'p': 
        return p(obj.text);
      case 'image': 
        return img(src);
      case 'strong':
        return strong(text);
      default:
        return div(type, text);      
    };
  }
})