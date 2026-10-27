// VARIABILI

let img_player; // spritesheet del player
let player; // oggetto sprite del player

let player_speed    = 185; // velocità di movimento orizzontale
let jump_init_speed = 500; // velocità iniziale del salto
let floor_height    = 1060; // altezza del pavimento 

let curr_anim = "stop"; // questa variabile contiene l'animazione corrente





// TIMER IDLE
let start_time = 0; // aggiungi questa variabile all'inizio del file con le altre variabili
let is_timing = false; // flag per controllare se il timer è attivo
const IDLE_DELAY = 5000; // 5 secondi in millisecondi

function configure_player_animations(s) { // configuro le animazioni secondo lo spritesheet
    // animazione fermo
    PP.assets.sprite.animation_add(player, "fermo", 0, 0, 10, 0);
    PP.assets.sprite.animation_play(player, "fermo"); // fai partire l'animazione fermo
    // animazione run
    PP.assets.sprite.animation_add_list(player, "run_start", [1], 10, 0); 
    PP.assets.sprite.animation_add_list(player, "run_loop", [2, 3, 4], 8, -1); 
    PP.assets.sprite.animation_add(player, "run_stop", 5, 5, 10, 0); 
    // animazione jump
    PP.assets.sprite.animation_add_list(player, "jump_up", [26, 28], 10, 0); 
    PP.assets.sprite.animation_add_list(player, "in_aria", [29, 30], 6, -1); 
    PP.assets.sprite.animation_add_list(player, "atterraggio", [31, 32], 10, 0); 
    // animazione hurt
    PP.assets.sprite.animation_add_list(player, "hurt", [0, 6], 10, -1);
    // animazione interazione
    PP.assets.sprite.animation_add_list(player, "interazione", [14, 15, 16, 17, 18, 19, 21, 0], 6, 0);
    // animazione morte
    PP.assets.sprite.animation_add_list(player, "morte", [25, 24, 23, 22], 6, 0);
    // animazione idle
    PP.assets.sprite.animation_add_list(player, "idle", [7, 8, 9, 10, 11, 12], 6, -1); 
}

function preload_player(s) { 
    img_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 51.57, 60); // carico spritesheet player
}

function create_player(s) { 
    player = PP.assets.sprite.add(s, img_player, PP.game_state.get_variable("spawn_position_x"),PP.game_state.get_variable("spawn_position_y"), 0.5, 1); // posizione corretta del player
    // player = PP.assets.sprite.add(s, img_player, 2650, 483, 0.5, 1); // posizione test player
    PP.physics.add(s, player, PP.physics.type.DYNAMIC);  // aggiungo il giocatore alla fisica come entità dinamica

    PP.physics.set_collision_rectangle(player, // imposta una hitbox rettangolare più piccola dell'immagine
    44,  // width: 40 px
    52,  // height: 52 px
    2,  // offset X: sposta la hitbox di 2 px a destra
    0    // offset Y: sposta la hitbox di 0 px in basso
);
}

// il giocatore è sulla piattaforma?
function is_player_on_platform(player) { 
    return player.ph_obj.body.touching.down; // se il player tocca con la parte bassa del corpo qualcosa
}

function manage_player_update(s) { 

    let next_anim = curr_anim;

    if(PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
        console.log("Right key pressed");
        PP.physics.set_velocity_x(player, player_speed);
        next_anim = "run_loop";
        is_timing = false;
    }
    else if(PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT)) {
        console.log("Left key pressed");
        PP.physics.set_velocity_x(player, -player_speed);
        next_anim = "run_loop";
        is_timing = false;
    } else {
        PP.physics.set_velocity_x(player, 0);
        if (curr_anim !== "idle") {
            next_anim = "run_stop";
        }
    }

    if(is_player_on_platform(player)) {
        if(PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)) {
            PP.physics.set_velocity_y(player, -jump_init_speed);
            is_timing = false;
        }
    }

    if(PP.physics.get_velocity_y(player) < 0) {
        next_anim = "jump_up";
        is_timing = false;
    }
    else if(PP.physics.get_velocity_y(player) > 0) {
        next_anim = "atterraggio";
        is_timing = false;
    }

    // gestione del cambio animazione
    if(next_anim != curr_anim) {
        PP.assets.sprite.animation_play(player, next_anim);
        curr_anim = next_anim;
        
        if (curr_anim === "run_stop") {
            start_time = s.game.loop.time;
            is_timing = true;
        }
    }

    // timer per l'animazione idle
    if (is_timing) {
        let elapsed = s.game.loop.time - start_time;
        //console.log(`Timer: ${Math.floor(elapsed)} ms`);
        
        if (elapsed >= IDLE_DELAY) {
            console.log("Timer completato: avvio animazione idle");
            PP.assets.sprite.animation_play(player, "idle");
            curr_anim = "idle";
            is_timing = false;
            start_time = 0;
        }
    }

    if (PP.physics.get_velocity_x(player) < 0) {
        player.geometry.flip_x = true;
    }
    else if (PP.physics.get_velocity_x(player) > 0) {
        player.geometry.flip_x = false;
    }
}