/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.transporter');
 * mod.thing == 'a thing'; // true
 */
var roleTransporter = {
    
    run: function(creep) {
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
        var towers = creep.room.find(FIND_STRUCTURES, { 
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
            }
        });
        
        
        
        if (creep.store.getUsedCapacity() != creep.store.getCapacity() && !Game.getObjectById(creep.memory.homeSpawnID).memory.spawnWaiting) {
            if(creep.withdraw(containers[0], RESOURCE_ENERGY) != OK) {
                creep.moveTo(containers[0]);
            }
        } else {
            if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(towers[0]);
            }
        }
    
    }
}
module.exports = roleTransporter;