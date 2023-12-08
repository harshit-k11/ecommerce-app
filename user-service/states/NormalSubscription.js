const SubscriptionState = require('./SubscriptionState');
const SilverSubscription = require('./SilverSubscription');

class NormalSubscription extends SubscriptionState {
    nextSubscription() {
        this.user.setSubscriptionState(new SilverSubscription(this.user));
    }

    previousSubscription() {
        // No previous subscription available.
    }

    getDiscount() {
        return 0; // No discount for Normal subscription
    }
}

module.exports = NormalSubscription;