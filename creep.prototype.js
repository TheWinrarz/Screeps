var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");
var roleDefender = require("role.defender");
var roleTransporter = require("role.transporter");
var roleCreep = require("role.creep");
var roleGatherer = require("role.gatherer");
var roleStaticHarvester = require("role.staticHarvester");

Creep.prototype.execute = function() {
    
    	//Run Creeps

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
        else if (this.memory.role == "transporter") {
            roleTransporter.run(this);
        }
        else if (this.memory.role == "gatherer") {
            roleGatherer.run(this);
        }
        else if (this.memory.role == "static_harvester") {
            roleStaticHarvester.run(this);
        }

            
}


Creep.prototype.returnHome = function() {
    if (this.memory.homeSpawnID){
        this.moveTo(Game.getObjectById(this.memory.homeSpawnID), "#ff0000");
    }
}

Creep.prototype.isEmpty = function() {
    return (this.store.getUsedCapacity() == 0);
}


Creep.prototype.acquireTarget = function(room, role) {
    
    if(role == "static_harvester") {
        var sources = room.find(FIND_SOURCES);
    }
    
}

