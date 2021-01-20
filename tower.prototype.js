StructureTower.prototype.execute = function() {
        




    var hostileTargets = this.pos.findInRange(FIND_HOSTILE_CREEPS, 20);
    
    if(hostileTargets.length) {
        this.attack(hostileTargets[0]);
    }
    
        
    var healingTargets = this.pos.findInRange(FIND_MY_CREEPS, 20, {
        filter: (c) => (c.hits < c.hitsMax)
    });
    
    if(healingTargets.length) {
        this.heal(healingTargets[0]);
    }
    
    var priorityStructuresToRepair = this.pos.findInRange(FIND_STRUCTURES, 20, {
        filter: (s) => (s.hits < s.hitsMax && s.my && s.structureType == STRUCTURE_RAMPART)
    } );
    
    var structuresToRepair = this.pos.findInRange(FIND_STRUCTURES, 20, {
        filter: (s) => (s.hits < s.hitsMax && s.structureType == STRUCTURE_WALL)
    } );
    
    
    structuresToRepair.sort(function(s1, s2){return s1.hits - s2.hits});
    
    if(priorityStructuresToRepair.length){
        this.repair(priorityStructuresToRepair[0]);
    }
    else if(structuresToRepair.length) {
        this.repair(structuresToRepair[0]);
    }

}