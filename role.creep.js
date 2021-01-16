//Behavior that all creeps enact

var roleCreep = {

    
    run: function(creep) {
        
        //set homespawn if there is not one
        if (!creep.memory.homeSpawn) {
            creep.memory.homeSpawn = Game.spawns["DannyS"];
        }
        
        
        if (creep.ticksToLive < 150) {
            if (Game.getObjectById(creep.memory.homeSpawn.id).renewCreep(creep) == ERR_NOT_IN_RANGE) {
                creep.returnHome();
            }
        }
    }
    
}

module.exports = roleCreep;