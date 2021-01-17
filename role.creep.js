//Behavior that all creeps enact

var roleCreep = {

    
    run: function(creep) {
        //set homespawn if there is not one
        if (!creep.memory.homeSpawnID) {
            creep.memory.homeSpawnID = Game.spawns["DannyS"].id;
        }
        
        
    }
    
}

module.exports = roleCreep;