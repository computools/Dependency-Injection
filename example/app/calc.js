/**
 * @class Calc
 */
class Calc {
    constructor() {
        /**
         * @inject {Mult} mult
         */
        this.multWorker = null;

        /**
         * @inject {Plus} plus
         */
        this.plusWorker = null;
    }

    /**
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    mult(a, b) {
        return this.plusWorker.do(a, b);
    }

    /**
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    plus(a, b) {
        return this.plusWorker.do(a, b);
    }
}

module.exports = {Calc};