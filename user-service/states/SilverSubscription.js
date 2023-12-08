const SubscriptionState = require('./SubscriptionState');
const NormalSubscription = require('./NormalSubscription');
const GoldSubscription = require('./GoldSubscription');

class SilverSubscription extends SubscriptionState {
    nextSubscription() {
        this.user.setSubscriptionState(new GoldSubscription(this.user));
    }

    previousSubscription() {
        this.user.setSubscriptionState(new NormalSubscription(this.user));
    }

    getDiscount() {
        return 10; // 10% discount for Silver subscription
    }
}

module.exports = SilverSubscription;