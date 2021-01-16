
var roleRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {

        
        //temporary workaround
        if (creep.memory.threshold > 500000) {
            creep.memory.threshold = 10000;
        }
        //If creep was repairing and runs out of energy, set repairing to false
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
        }
        //If creep was not repairing and is full of energy, set repairing to true
        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
        }

        //If repairing is set to true, look for building sites
        if(creep.memory.repairing) {  
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    //Don't repair roads right now, they decay too quickly and there are more important matters
                    return ((structure.hits < creep.memory.threshold && structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_ROAD && structure.structureType != STRUCTURE_CONTROLLER && structure.structureType != STRUCTURE_EXTENSION && structure.structureType != STRUCTURE_SPAWN) 
                        || (structure.structureType == STRUCTURE_RAMPART && structure.hits < structure.hitsMax));
                }
            });
            
            if(targets.length) {
                
                var chosenTargets;
                
                var target = targets[0];

                
                for (var potentialTarget in targets) {
                    //prioritize ramparts with lowest hitpoints
                    if (potentialTarget.structureType == STRUCTURE_RAMPART) {
                        target = potentialTarget;
                    }
                    
                }
                
                //console.log("Creep: " + creep + " Potential Targets: " + targets + " Chosen Target: " + target);
                
                
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#00ffff'}});
                }
            }
            
            //If no targets found, move towards spawn
            else {
                //every time the creep moves, another 5000 hits added to threshold. this results in weird behavior
                creep.moveTo(Game.spawns["DannyS"]);
                creep.memory.threshold = creep.memory.threshold + 5000;

            }
        }
        //Else gather energy
        else {
            
            //If there is sufficient energy in spawn withdraw from there
            if (creep.room.energyAvailable > 300) {
                var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_CONTAINER) && s.store[RESOURCE_ENERGY] > 0 
                });
                console.log(Container);
                if (creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                
                
            }
            else {
                creep.returnHome();
            }
        }
        
        
    }
}

module.exports = roleRepairer;