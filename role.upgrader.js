var signText = "There's a new sheriff in town";  
  
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(true){
            switch (creep.memory.CREEP_STATE){
                case "waiting":
                    if (creep.store.getFreeCapacity() != 0){
                        creep.memory.CREEP_STATE = "withdrawing";
                    } else {
                        creep.memory.CREEP_STATE = "upgrading";
                    }
                    break;
                case "withdrawing":
                    if (creep.store.getFreeCapacity() == 0) {
                        creep.memory.CREEP_STATE = "upgrading";
                    }
                    else {
                        var Containers = creep.pos.findInRange(FIND_STRUCTURES, 35, {
                            filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_EXTENSION) && s.store.getUsedCapacity("energy") > 0 
                        });
                        if (Containers.length) {
                            var Container = Containers[0];
                            if (creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(Container, {visualizePathStyle: {stroke: '#ffaa00'}});
                            }
                        }
                    }
                    break;
                case "upgrading":
                    if (creep.store[RESOURCE_ENERGY] == 0) {
                        creep.memory.CREEP_STATE = "withdrawing";
                    }
                    if(creep.room.controller.sign.text != signText) {
                        creep.signController(creep.room.controller, signText);
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    break;
                default:
                    console.log("No known state detected");
            }
        }
    }
};

module.exports = roleUpgrader;