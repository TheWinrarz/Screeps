var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");
var roleDefender = require("role.defender");
var roleCreep = require("role.creep");

require("creep.prototype");


var roleSpawn = require("building.spawn");


module.exports.loop = function () {
    
    console.log("Bucket size: " + Game.cpu.bucket);
    
    //generate pixels
    if (true && Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }

    //I put this control here incase we went over cpu limit, doesn't look like an issue for now
    if (true) {
        
        //Get bucket value before script executes
        var startBucket = Game.cpu.bucket;
        
        //Delete dead creeps from memory
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        

    	//Run Creeps
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            roleCreep.run(creep);
            if (creep.memory.role == "repairer") {
                roleRepairer.run(creep);
            }
            if (creep.memory.role == "harvester") {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == "upgrader") {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == "builder") {
                roleBuilder.run(creep);
            }
            if (creep.memory.role == "defender") {
                roleDefender.run(creep);
            }

            
        }
        
        //Run spawn behavior
        for(var name in Game.spawns) {
            var spawn = Game.spawns[name];
            roleSpawn.run(spawn);
        }

        //Get end bucket value and calculate delta
        var endBucket = Game.cpu.bucket;
        var usedBucket = startBucket - endBucket;
        console.log("CPU used from bucket: " + usedBucket);
        console.log("CPU used this tick: " + Game.cpu.getUsed());
    }
}