
    
function acquireTarget(creep) {
    var hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 25);
    var target = hostiles[0];
    return target;
}

function attackTarget(creep, target) {
    if (creep.rangedAttack(target) == -9) {
        creep.moveTo(target);
    }
    
    //Closest point in rampart to outside - closest point where creeps are safe
    creep.moveTo(2, 27);
}
    

var roleDefender = {
    
    run: function(creep) {
        var target = acquireTarget(creep);
        if (creep.ticksToLive < 100) {
            creep.returnHome();
        }
        else if (target) {   
            attackTarget(creep, target);
        } 
        else {
            //Patrol function?
            creep.moveTo(8, 32);
        }
        
    }
    

    
}



module.exports = roleDefender;