var signText = "There's a new sheriff in town";  
  
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        

        
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
        }

        if(creep.memory.upgrading) {
            if(creep.room.controller.sign.text != signText) {
                creep.signController(creep.room.controller, signText);
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            
        }
        else {
            if (creep.store.getFreeCapacity() > 0 && !Game.getObjectById(creep.memory.homeSpawn.id).memory.spawnWaiting) {
                //Create object list of all containers in range 30
                
                var Containers = creep.pos.findInRange(FIND_STRUCTURES, 30, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && s.store.getUsedCapacity("energy") > 0 
                });
                
                if (Containers.length) {
                    
                    var Container = Containers[0];
                    
                    if (creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Container, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                else {
                    creep.moveTo(35, 25);
                }
                
                
            }
            else {
                creep.returnHome();
            }
        }
    }
};

module.exports = roleUpgrader;