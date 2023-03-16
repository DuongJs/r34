const axios = require("axios")
module.exports = {
  name: "sauce",
  run: async (req, resp) => {
    try{
    if (!req.query.url) return resp.json({ error: "Vui lòng nhập link url" })
    const res = await axios.post('https://saucenao.com/search.php', {
      api_key: 'ffcd095ae4c7f0ff0246d02682d6f3d89790b9b2',
      output_type: '2',
      db: '999',
      hide: '0',
      url: req.query.url
    }, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    console.log(res.data)
    const data = [];
    for(let i = 0; i < res.data.results.length; i++){
      var img = res.data.results[i].header.thumbnail
      var url = res.data.results[i].data.ext_urls[0]
      var title = res.data.results[i].data.title
      var member_name = res.data.results[i].data.member_name
      data.push({thumbnail: img, url: url, title: title, member_name: member_name})
    }
    resp.json(data)
    }catch(e) { resp.json({error : "Không tìm thấy ảnh này !" })}
  }
}
