let img_checkpoint; 
let checkpoint;

function configure_checkpoint_animations(s) { 
    PP.assets.sprite.animation_add(checkpoint, "bandiera_si_alza", 1, 6, 6, 0);
    PP.assets.sprite.animation_add(checkpoint, "bandiera_svolazza", 7, 9, 5, -1);

}

function preload_checkpoint(s) {
    img_checkpoint = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_checkpoint.png", 66.2, 69); 
    
}

function create_checkpoint(s) {
    checkpoint = PP.assets.sprite.add(s, img_checkpoint, 2650, 483, 0, 0); 
    PP.physics.add(s, checkpoint, PP.physics.type.STATIC);

}