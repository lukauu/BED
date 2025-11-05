var express = require('express');
var router = express.Router();

const selfServiceWarehouse = {
    thelo: {
      1: {
        item: 'bicycle',
        quantity: 1
      },
      4: {
        item: 'carpet',
        quantity: 3
      }
    },
    htulo: {
        1: {
          item: 'table lamp',
          quantity: 1
        },
        3: {
          item: 'skates',
          quantity: 2
        }
      }   
};

router.get('/', function(req, res) {
    let customerIds = Object.keys(selfServiceWarehouse);
    
    const sort = req.query.sort?.toLowerCase();
    if (sort === 'asc') {
        customerIds.sort();
    } else if (sort === 'desc') {
        customerIds.sort().reverse();
    }
    res.json(customerIds);
});

router.get('/:customerId', function(req, res) {
    const customerId = req.params.customerId;

    res.json(selfServiceWarehouse[customerId]);
});

module.exports = router;