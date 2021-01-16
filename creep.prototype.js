
Creep.prototype.returnHome = function() {
    if (this.memory.homeSpawn){
        this.moveTo(Game.getObjectById(this.memory.homeSpawn.id), "#ff0000");
    }
}
