
var roleGatherer = {
    
    run: function(creep) {
        
        if (true) {
            var tombstones = creep.room.find(FIND_TOMBSTONES);
            var droppedResources = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: (droppedResource) => {
                    return ((droppedResource.resourceType == RESOURCE_ENERGY));
                }
            });
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            
            switch (creep.memory.CREEP_STATE) {
                case "waiting":
                    if(!creep.isEmpty()){
                        creep.memory.CREEP_STATE = "depositing";
                    } else {
                        creep.memory.CREEP_STATE = "gathering";
                    }
                    break;
                case "depositing":
                    if(creep.isEmpty()) {
                        creep.memory.CREEP_STATE = "gathering";
                    }
                    else if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[0]);
                    }
                    break;
                case "gathering":
                    if(creep.store.getFreeCapacity() == 0) {
                        creep.memory.CREEP_STATE = "depositing";
                    }
                    else if(creep.pickup(droppedResources[0]) != OK) {
                        creep.moveTo(droppedResources[0]);
                    }
                    break;
                default:
                    console.log(creep + " no known state detected");
            }
            
        }
        
        if (false) {
            var tombstones = [];//creep.room.find(FIND_TOMBSTONES);
            var droppedResources = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: (droppedResource) => {
                    return ((droppedResource.resourceType == RESOURCE_ENERGY));
                }
            });
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_EXTENSION) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            
            if (creep.store.getUsedCapacity() != creep.store.getCapacity()) {
                if(creep.pickup(droppedResources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedResources[0]);
                }
            } else {
                if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                }
            }
        }
    
    }
}
module.exports = roleGatherer;