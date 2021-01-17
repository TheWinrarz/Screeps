MAX_HARVESTERS = 4;
MAX_UPGRADERS = 3;
MAX_BUILDERS = 1;
MAX_REPAIRERS = 1;
MAX_DEFENDERS = 0;
var roleSpawn = {
    run: function(spawn) {
        
        //Count creeps in room owned by me and has this spawn as homespawn
        //Should probably be all creeps?
        var creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
    	var repairers = _.filter(creepsInRoom, c => c.my && spawn == Game.getObjectById(c.memory.homeSpawnID) && c.memory.role == "repairer");
    	var harvesters = _.filter(creepsInRoom, c => c.my && spawn == Game.getObjectById(c.memory.homeSpawnID) && c.memory.role == "harvester");
    	var upgraders = _.filter(creepsInRoom, c => c.my && spawn == Game.getObjectById(c.memory.homeSpawnID) && c.memory.role == "upgrader");
    	var builders = _.filter(creepsInRoom, c => c.my && spawn == Game.getObjectById(c.memory.homeSpawnID) && c.memory.role == "builder");
    	var defenders = _.filter(creepsInRoom, c => c.my && spawn == Game.getObjectById(c.memory.homeSpawnID) && c.memory.role == "defender");

    	var repairerCount = repairers.length;
    	var harvesterCount = harvesters.length;
    	var upgraderCount = upgraders.length;
    	var builderCount = builders.length;
    	var defenderCount = defenders.length;
        
        spawn.memory.spawnWaiting = false;

            	
    	//Spawn creeps if needed
    	spawn.memory.spawnWaiting = true;
        if (upgraderCount < MAX_UPGRADERS) {
            console.log(spawn.name + " upgrader spawn waiting");
        	spawn.spawnCreep( [WORK, WORK, WORK, MOVE, MOVE, CARRY], "Upgrader" + Game.time, {memory: {role: "upgrader", homeSpawnID: spawn.id, upgrading: false}});
        }    
        
    	else if (repairerCount < MAX_REPAIRERS) {
            console.log(spawn.name + " repairer spawn waiting");
        	spawn.spawnCreep( [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY], "Repairer" + Game.time, {memory: {role: "repairer", threshold: 10000, homeSpawnID: spawn.id, repairing: false}});
        }
        
    	else if (builderCount < MAX_BUILDERS) {
            console.log(spawn.name + " builder spawn waiting");
            spawn.spawnCreep( [WORK, MOVE, MOVE, CARRY, CARRY], "Builder" + Game.time, {memory: {role: "builder", homeSpawnID: spawn.id, building: false}});
        }
        
    	else if (harvesterCount < MAX_HARVESTERS) {
            console.log(spawn.name + " harvester spawn waiting");
        	spawn.spawnCreep( [WORK, WORK, MOVE, MOVE, CARRY], "Harvester" + Game.time, {memory: {role: "harvester", homeSpawnID: spawn.id, harvesting: false}});
        }
    	else if (defenderCount < MAX_DEFENDERS) {
            console.log(spawn.name + " defender spawn waiting");
        	spawn.spawnCreep( [MOVE, MOVE, RANGED_ATTACK], "Defender" + Game.time, {memory: {role: "defender", homeSpawnID: spawn.id}});
        }
        else {
    	    spawn.memory.spawnWaiting = false;
        }  
        
        
        
    }
}


module.exports = roleSpawn;