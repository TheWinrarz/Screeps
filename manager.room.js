
var RoomManager = {
    
    function init(room) {
        
    }
    
    
    run: function(room) {
        
        var energySources = room.find(FIND_SOURCES);
        var mySpawns = room.find(FIND_MY_SPAWNS);
        var myExtensions = = room.find(FIND_STRUCTURES, {
            filter: (s) => { 
                return (s.structureType == STRUCTURE_EXTENSION && s.my); 
            }
        });
        var containers = = room.find(FIND_STRUCTURES, {
            filter: (s) => { 
                return (s.structureType == STRUCTURE_CONTAINER && s.my); 
            }
        });
        
        var creepsInRoom = room.find(FIND_CREEPS);
        var myCreeps =  _.filter(creepsInRoom, c => c.my);
        
        //Need to create memory in creep.prototype for creep to determine if it is home. Then can use in filter.
        //Room should only give commands to creeps that live in it
        
    }
    
    
}


module.exports = RoomManager;