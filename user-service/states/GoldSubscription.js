const SubscriptionState = require('./SubscriptionState');
const SilverSubscription = require('./SilverSubscription');

class GoldSubscription extends SubscriptionState {
    nextSubscription() {
        // No next subscription available.
    }

    previousSubscription() {
        this.user.setSubscriptionState(new SilverSubscription(this.user));
    }

    getDiscount() {
        return 20; // 20% discount for Gold subscription
    }
}

module.exports = GoldSubscription;