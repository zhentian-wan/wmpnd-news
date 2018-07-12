const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



const img = (src = "", alt = "") => {
  return `<img src="${src}" alt="${alt}" style="width: 100%;"/>`;
}

const p = (text) => {
  return `<p style="padding: 10px 0; opacity: 0.7;">${text}</p>`;
}
 
const strong = (text) => {
  return `<p style="padding: 10px 0;"><strong>${text}</strong></p>`;
}

const div = (type, text) => {
  return `<${type}>${text}</${type}>`;
}

module.exports = {
  formatTime,
  strong,
  div,
  p,
  img
}
