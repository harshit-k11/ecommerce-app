const Discount = require('../interfaces/DiscountRepository')


class FestivalSaleDiscountFactory extends Discount {
    constructor( ) {
        super()
        this.discountPercentage = 10
        this.statusFestivalSaleDiscountFactory = true
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

  module.exports = FestivalSaleDiscountFactory;