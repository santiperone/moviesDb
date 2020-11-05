const fs = require('fs');
const path = require('path');
module.exports = {
    main: function(req, res, next) {
        let productDataJSON = fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json'));
        let productData = JSON.parse(productDataJSON);
        let lastSeen = productData.filter(prod => prod.category == "visited").slice(0,4);
        let offers = productData.filter(prod => prod.category == "in-sale").slice(0,4);
        res.render('index', { title: 'Express', lastSeen, offers});
      },
}