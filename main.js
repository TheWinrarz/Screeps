require("creep.prototype");
require("tower.prototype");
//var RoomManager = require("manager.room");

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
        
        //////////////////////
        //Room based logic
        //////////////////////
        /*
        for(var roomName in Game.rooms){
            let room = Game.rooms[roomName]; 
            RoomManager.run(room);
        }



        */
    	//Run Creeps
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            creep.execute();
        }
        
        //Run spawn behavior
        for(var name in Game.spawns) {
            var spawn = Game.spawns[name];
            roleSpawn.run(spawn);
        }
        
        //Run tower behavior
        var towers = _.filter(Game.structures, structure => structure.structureType == STRUCTURE_TOWER);
        for(var tower of Object.values(towers)) {
            tower.execute();
        }

        //Get end bucket value and calculate delta
        var endBucket = Game.cpu.bucket;
        var usedBucket = startBucket - endBucket;
        console.log("CPU used from bucket: " + usedBucket);
        console.log("CPU used this tick: " + Game.cpu.getUsed());
    }
}