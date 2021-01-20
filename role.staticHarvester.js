/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.staticHarvester');
 * mod.thing == 'a thing'; // true
 */
var roleStaticHarvester = {
    
    run: function(creep) {
        
          
        if (true){
            
            switch (creep.memory.CREEP_STATE) {
                case "waiting":
                    creep.memory.CREEP_STATE = "harvesting";
                    break;
                    
                case "harvesting":
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                    break;
                    
                default:
                    console.log(creep.name + " no known state detected");
            }
            
        }

       
        
    }
    
}


module.exports = roleStaticHarvester;