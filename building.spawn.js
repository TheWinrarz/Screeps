MAX_HARVESTERS = 4;
MAX_UPGRADERS = 4;
MAX_BUILDERS = 2;
MAX_REPAIRERS = 1;
MAX_DEFENDERS = 0;
MAX_TRANSPORTERS = 2;
MAX_GATHERERS = 2;
MAX_STATIC_HARVESTERS = 1;

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
    	var transporters = _.filter(creepsInRoom, c => c.my && spawn == Game.getObjectById(c.memory.homeSpawnID) && c.memory.role == "transporter");
    	var gatherers = _.filter(creepsInRoom, c => c.my && spawn == Game.getObjectById(c.memory.homeSpawnID) && c.memory.role == "gatherer");
        var staticHarvesters = _.filter(creepsInRoom, c => c.my && spawn == Game.getObjectById(c.memory.homeSpawnID) && c.memory.role == "static_harvester");

        var gathererCount = gatherers.length;
    	var repairerCount = repairers.length;
    	var harvesterCount = harvesters.length;
    	var upgraderCount = upgraders.length;
    	var builderCount = builders.length;
    	var defenderCount = defenders.length;
    	var transporterCount = transporters.length;
    	var staticHarvesterCount = staticHarvesters.length;
        
        spawn.memory.spawnWaiting = false;
        if (!spawn.room.find(FIND_MY_CREEPS).length) {
            spawn.spawnCreep( [WORK, MOVE, CARRY], "BACKUPANDREBOOT", {memory: {role: "harvester", homeSpawnID: spawn.id, harvesting: false}});
        }
            	
    	//Spawn creeps if needed
    	spawn.memory.spawnWaiting = true;
    	if (harvesterCount < MAX_HARVESTERS) {
            console.log(spawn.name + " harvester spawn waiting");
        	spawn.spawnCreep( [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY], "H" + Game.time, {memory: {role: "harvester", homeSpawnID: spawn.id, harvesting: false}});
        }
        else if (upgraderCount < MAX_UPGRADERS) {
            console.log(spawn.name + " upgrader spawn waiting");
        	spawn.spawnCreep( [WORK, WORK, MOVE, MOVE, CARRY, CARRY], "U" + Game.time, {memory: {role: "upgrader", homeSpawnID: spawn.id, upgrading: false}});
        }    
        else if (staticHarvesterCount < MAX_STATIC_HARVESTERS) {
            console.log(spawn.name + " static harvester spawn waiting");
        	spawn.spawnCreep( [WORK, WORK, WORK, WORK, MOVE ], "StH" + Game.time, {memory: {role: "static_harvester", homeSpawnID: spawn.id}});
        }
        else if (gathererCount < MAX_GATHERERS) {
            console.log(spawn.name + " gatherer spawn waiting");
            spawn.spawnCreep( [MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY], "G" + Game.time, {memory: {role: "gatherer", homeSpawnID: spawn.id}});
        }  
    	else if (repairerCount < MAX_REPAIRERS) {
            console.log(spawn.name + " repairer spawn waiting");
        	spawn.spawnCreep( [WORK, MOVE, CARRY], "R" + Game.time, {memory: {role: "repairer", threshold: 10000, homeSpawnID: spawn.id, repairing: false}});
        }
        
    	else if (builderCount < MAX_BUILDERS) {
            console.log(spawn.name + " builder spawn waiting");
            spawn.spawnCreep( [WORK, MOVE, CARRY, CARRY], "B" + Game.time, {memory: {role: "builder", homeSpawnID: spawn.id, building: false}});
        }
        
    	else if (defenderCount < MAX_DEFENDERS) {
            console.log(spawn.name + " defender spawn waiting");
        	spawn.spawnCreep( [MOVE, MOVE, RANGED_ATTACK], "D" + Game.time, {memory: {role: "defender", homeSpawnID: spawn.id}});
        }
        else if (transporterCount < MAX_TRANSPORTERS) {
            console.log(spawn.name + " transporter spawn waiting");
            spawn.spawnCreep( [MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY], "Tr" + Game.time, {memory: {role: "transporter", homeSpawnID: spawn.id}});
        }
        else {
    	    spawn.memory.spawnWaiting = false;
        }  
        
        
        
    }
}


module.exports = roleSpawn;