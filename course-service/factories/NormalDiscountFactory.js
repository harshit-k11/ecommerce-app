const Discount = require('../interfaces/DiscountRepository')


class NormalDiscountFactory extends Discount {
    constructor( ) {
      super()
      this.discountPercentage = 5
      this.statusNormalDiscountFactory=true
    }
  
    applyDiscount() {
      if(this.statusFestivalSaleDiscountFactory){
        return discountPercentage;
    }
    else{
        return 0;
    }
    }
  }

  module.exports = NormalDiscountFactory;