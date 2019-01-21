const Cast = require('../util/cast');
const MathUtil = require('../util/math-util');
const Timer = require('../util/timer');


class Scratch3RobotBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        this.power_in_percent_left = 50;
        this.power_in_percent_right = 50;
      //  this.power = Math.round(this.power_in_percent* 0.63);

    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives () {
        return {

            otto_move_walk:this.otto_move_walk,


            robot_motors_off:this.robot_motors_off,



        };
    }

    otto_move_walk(args,util)
    {

       util.yield();
        this.runtime.OCA
    }
    robot_motors_off(args, util){

      console.log(`Robot stop!`);

      clearInterval(this.motors_on_interval);
      clearInterval(this.motors_off_interval);

      this.need_to_stop = true;

      this.runtime.RCA.setRobotPower(0,0,0);
    }


    }

    module.exports = Scratch3RobotBlocks;
