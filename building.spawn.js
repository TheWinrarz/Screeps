MAX_HARVESTERS = 7;
MAX_UPGRADERS = 5;
MAX_BUILDERS = 1;
MAX_REPAIRERS = 3;
MAX_DEFENDERS = 1;
var roleSpawn = {
    run: function(spawn) {
        
        //Count creeps in room owned by me and has this spawn as homespawn
        //Should probably be all creeps?
        var creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
    	var repairers = _.filter(creepsInRoom, (creep) => creep.my && spawn == Game.getObjectById(creep.memory.homeSpawn.id) && creep.memory.role == "repairer");
    	var harvesters = _.filter(creepsInRoom, (creep) => creep.my && spawn == Game.getObjectById(creep.memory.homeSpawn.id) && creep.memory.role == "harvester");
    	var upgraders = _.filter(creepsInRoom, (creep) => creep.my && spawn == Game.getObjectById(creep.memory.homeSpawn.id) && creep.memory.role == "upgrader");
    	var builders = _.filter(creepsInRoom, (creep) => creep.my && spawn == Game.getObjectById(creep.memory.homeSpawn.id) && creep.memory.role == "builder");
    	var defenders = _.filter(creepsInRoom, (creep) => creep.my && spawn == Game.getObjectById(creep.memory.homeSpawn.id) && creep.memory.role == "defender");

    	var repairerCount = repairers.length;
    	var harvesterCount = harvesters.length;
    	var upgraderCount = upgraders.length;
    	var builderCount = builders.length;
    	var defenderCount = defenders.length;
        
        spawn.memory.spawnWaiting = false;

            	
    	//Spawn creeps if needed
    	spawn.memory.spawnWaiting = true;
        
        if (harvesterCount < MAX_HARVESTERS) {
            console.log(spawn.name + " harvester spawn waiting");
        	spawn.spawnCreep( [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY], "Harvester" + Game.time, {memory: {role: "harvester"}});
        }
    	else if (repairerCount < MAX_REPAIRERS) {
            console.log(spawn.name + " repairer spawn waiting");
        	spawn.spawnCreep( [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY], "Repairer" + Game.time, {memory: {role: "repairer", threshold: 10000}});
        }
        
    	else if (builderCount < MAX_BUILDERS) {
            console.log(spawn.name + " builder spawn waiting");
            spawn.spawnCreep( [WORK, MOVE, MOVE, CARRY, CARRY], "Builder" + Game.time, {memory: {role: "builder"}});
        }
        
    	else if (upgraderCount < MAX_UPGRADERS) {
            console.log(spawn.name + " upgrader spawn waiting");
        	spawn.spawnCreep( [WORK, WORK, WORK, MOVE, MOVE, CARRY], "Upgrader" + Game.time, {memory: {role: "upgrader"}});
        }    
        
    	else if (defenderCount < MAX_DEFENDERS) {
            console.log(spawn.name + " defender spawn waiting");
        	spawn.spawnCreep( [MOVE, MOVE, RANGED_ATTACK], "Defender" + Game.time, {memory: {role: "defender"}});
        }
        else {
    	    spawn.memory.spawnWaiting = false;
        }  
    }
}


module.exports = roleSpawn;