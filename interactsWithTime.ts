
const DateTime = require('./dateTime');;
/**
 * Class InteractsWithTime.
 */
class InteractsWithTime {

    /**
     * secondsUntil method.
     * @param {*} $delay
     * @returns {any}
     */
    secondsUntil($delay: any) {
        $delay = this.parseDateInterval($delay);

        return $delay instanceof DateTime
            ? Math.max(0, $delay.getTimestamp() - this.currentTime())
            : parseInt($delay);
    }

    /**
     * availableAt method.
     * @param {*} $delay
     * @returns {any}
     */
    availableAt($delay: number = 0) {
        $delay = this.parseDateInterval($delay);

        return $delay instanceof DateTime
            ? $delay.getTimestamp()
            : DateTime.now().addSeconds($delay).getTimestamp();
    }

    /**
     * parseDateInterval method.
     * @param {*} $delay
     * @returns {any}
     */
    parseDateInterval($delay: any) {
        if ($delay instanceof DateTime) {
            $delay = DateTime.now().add($delay);
        }

        return $delay;
    }

    /**
     * currentTime method.
     * @returns {any}
     */
    currentTime() {
        return DateTime.now().getTimestamp();
    }
}
module.exports = InteractsWithTime;
