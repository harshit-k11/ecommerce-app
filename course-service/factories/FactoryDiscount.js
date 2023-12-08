const FestivalSaleDiscountFactory = require('./FestivalSaleDiscountFactory')
const NormalDiscountFactory = require('./NormalDiscountFactory')


class FactoryDiscount  {
   
    createDiscount(discountType) {
        switch (discountType) {
          case 'Festival':
            return new FestivalSaleDiscountFactory();
          case 'Normal':
            return new NormalDiscountFactory();
          default:
            throw new Error(`Invalid discount type: ${discountType}`);
        }
      }
}

module.exports = FactoryDiscount;