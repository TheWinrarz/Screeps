function harvestEnergy(creep) {}



var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (true){
            
            switch (creep.memory.CREEP_STATE) {
                case "waiting":
                    if (creep.store.getFreeCapacity() > 0) {
                        creep.memory.CREEP_STATE = "harvesting";
                    } else {
                        creep.memory.CREEP_STATE = "depositing";
                    }
                    break;
                    
                case "harvesting":
                    if(creep.store.getFreeCapacity() == 0) {
                        creep.memory.CREEP_STATE = "depositing";
                    }
                    
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                    break;
                    
                case "depositing":
                    if(creep.isEmpty()) {
                        creep.memory.CREEP_STATE = "harvesting";
                    }
                    
                    //Acquire targets
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
            
                    var priorityTargets = _.filter(targets, target => target.structureType == STRUCTURE_SPAWN && target.structureType == STRUCTURE_EXTENSION);
                
                    //If structure is found, begin transfer
                    if(priorityTargets.length > 0) {
                        if(creep.transfer(priorityTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(priorityTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else if(targets.length > 0) {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    
                    break;
                    
                default:
                    console.log(creep.name + " no known state detected");
            }
            
        }

       
    
    }
}

module.exports = roleHarvester;