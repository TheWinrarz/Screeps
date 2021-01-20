
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (true) {
            switch (creep.memory.CREEP_STATE) {
                case "waiting":
                    if (creep.store.getFreeCapacity() != 0) {
                        creep.memory.CREEP_STATE ="withdrawing";
                    } else if (targets.length) {
                        creep.memory.CREEP_STATE = "building";
                    }
                    break;
                    
                case "withdrawing":
                    if(creep.store.getFreeCapacity() == 0) {
                        if(targets.length){
                            creep.memory.CREEP_STATE = "building";
                        }else {
                            creep.memory.CREEP_STATE = "waiting";
                        }
                        
                    }
                    
                    //If there is sufficient energy in spawn withdraw from there
                    if (creep.room.energyAvailable > 100 && !Game.getObjectById(creep.memory.homeSpawnID).memory.spawnWaiting) {
                        var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_EXTENSION) && s.store[RESOURCE_ENERGY] > 0 
                        });
                        if (creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Container, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                    break;
                    
                case "building":
                    
                    if(creep.isEmpty()){
                        creep.memory.CREEP_STATE = "withdrawing";
                    }
                    
                    if(targets.length) {
                        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    } else {
                        creep.memory.CREEP_STATE = "waiting";
                    }
                    break;
                    
                default:
                    console.log(creep.name + " no known state detected");
            }
        }
        
    }
};

module.exports = roleBuilder;