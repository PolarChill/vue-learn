module.exports = {
  configureWebpack: {
    devServer: {
      before(app) {
        app.get('/api/goods', function(req, res) {
          res.json({
            code: 0,
            list: [{ id: '1', name: '葡萄', price: '15' }, { id: '2', name: '苹果', price: '12' }, { id: '3', name: '西瓜', price: '5' }, { id: '4', name: '小柿子', price: '23' }]
          });
        });
      }
    }
  }
};
