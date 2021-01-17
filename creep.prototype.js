var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");
var roleDefender = require("role.defender");
var roleCreep = require("role.creep");


Creep.prototype.execute = function() {
    
    	//Run Creeps
        if (this.ticksToLive < 50){
            if (Game.getObjectById(this.memory.homeSpawnID).renewCreep(this) == ERR_NOT_IN_RANGE){
                this.returnHome()
            }
        }
        else {
        
            roleCreep.run(this);
            if (this.memory.role == "repairer") {
                roleRepairer.run(this);
            }
            else if (this.memory.role == "harvester") {
                roleHarvester.run(this);
            }
            else if (this.memory.role == "upgrader") {
                roleUpgrader.run(this);
            }
            else if (this.memory.role == "builder") {
                roleBuilder.run(this);
            }
            else if (this.memory.role == "defender") {
                roleDefender.run(this);
            }

            
        }
}


Creep.prototype.returnHome = function() {
    if (this.memory.homeSpawnID){
        this.moveTo(Game.getObjectById(this.memory.homeSpawnID), "#ff0000");
    }
}


Creep.prototype.getRenewed = function() {
    
}