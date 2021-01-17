
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        
        //If creep was building and runs out of energy, set building to false
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
        }
        //If creep was not building and is full of energy, set building to true
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }

        //If building is set to true, look for building sites
        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.returnHome();
            }
        }
        //Else gather energy
        else {
            
            //If there is sufficient energy in spawn withdraw from there
            if (creep.room.energyAvailable > 100) {
                var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_EXTENSION) && s.store[RESOURCE_ENERGY] > 0 
                });
                if (creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                
                
            }
            else {
                creep.returnHome();
            }
        }
    }
};

module.exports = roleBuilder;