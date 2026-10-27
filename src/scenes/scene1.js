// BACKGROUD
let img_background_1; // img piattaforme
let img_background_2; // img colonne
let img_background_3; // img rocce
let img_background_4; // img mare
let background_1; // oggetto piattaforme
let background_2; // oggetto colonne
let background_3; // oggetto rocce
let background_4; // oggetto mare


// OGGETTI
let bottle; // oggetto bottiglia

PP.game_state.set_variable("spawn_position_x", 320);
PP.game_state.set_variable("spawn_position_y", 1300);


// TESTI
let save_fish_text; // testo per salvare il pesciolino
let giro_manopola_text; // testo per girare la manopola
let text_fish_already_shown = false; // flag per verificare se il testo è stato già mostrato
let text_manopola_already_shown = false; // flag per verificare se il testo è stato già mostrato
let bottiglia_text; // testo per interagire con la bottiglia
let text_chiave_already_shown = false; // flag per verificare se il testo è stato già mostrato
let prendo_chiave_text;
let bottiglia_raccolta_text 
let bottiglia_raccolta_count = 0; // contatore di bottiglie raccolte
let text_vita_already_shown = false; // flag per verificare se il testo è stato già mostrato
let prendo_vita_text;


let interacted_fish = new Set(); // contatore dei pesci raccolti
let fish_interaction_counter = 0; // contatore delle interazioni con i pesci
let is_yellow_fish_dead = false
let bottiglie_raccolte = new Set(); // tracker di bottiglie raccolte


//FLAG
let ShouldFollow = false; // flag per verificare se la camera deve seguire il player
let Chiave_con_Manopola = false; // flag per verificare se il player ha spento il getto con la chiave
let passaggio_checkpoint = false; // flag per verificare se il player ha passato il checkpoint
let bottiglia_destroyed = false; // resetta il counter bottiglie raccolte
let prev_bottiglia_destroyed = false; // ritiene il valore precedente di bottle_destroyed
let scena_1_restarted = false; // flag per verificare se la scena 1 è stata riavviata


// GAME OVER
let game_over = false; // flag per il game over


// FINALI
let finale_corona = false; // flag per il finale corona


// OVERLAP
let overlap_count = 0; // contatore per il numero di overlap con la bottiglia
let can_overlap = true; // flag per verificare se è possibile fare overlap con la bottiglia




function yellow_fish_collision(s, player, yellow_fish) {
    console.log("Collisione con il pesciolino!"); // log per verificare la collisione

    if (!text_fish_already_shown) { // creo il testo solo se non è mai stato mostrato prima
        save_fish_text = PP.shapes.text_add(s, 818, 1240, ' "A" '); // creo il testo
        text_fish_already_shown = true;  // imposto il flag a true, in modo che il testo non venga mostrato più volte
        
        PP.timers.add_timer(s, 2000, function(s) { // aggiunto un timer per rimuovere il testo dopo 3 secondi
            if (save_fish_text) { // verifico se il testo esiste
                save_fish_text.ph_obj.destroy(); // rimuovo il testo
                save_fish_text = null; // imposto il testo a null
            }
        }, false); // imposto false per non ripetere il timer
    }

}


function manopola_collision(s, player, manopola) {
    console.log("Collisione con la manopola!"); // log per verificare la collisione

    if (!text_manopola_already_shown) { // creo il testo solo se non è mai stato mostrato prima
        giro_manopola_text = PP.shapes.text_add(s, 3488, 201, ' "A" '); // creo il testo
        text_manopola_already_shown = true;  // imposto il flag a true, in modo che il testo non venga mostrato più volte
        
        PP.timers.add_timer(s, 2000, function(s) { // aggiunto un timer per rimuovere il testo dopo 3 secondi
            if (giro_manopola_text) { // verifico se il testo esiste
                giro_manopola_text.ph_obj.destroy(); // rimuovo il testo
                giro_manopola_text = null; // imposto il testo a null
            }
        }, false); // imposto false per non ripetere il timer
    }

}


function fish_chiave_collision(s, player, fish_chiave) {
    console.log("Collisione con il fish_chiave!"); // log per verificare la collisione
    
    if (!text_chiave_already_shown) { // creo il testo solo se non è mai stato mostrato prima
        prendo_chiave_text = PP.shapes.text_add(s, 1360, 187, ' "A" '); // creo il testo
        text_chiave_already_shown = true;  // imposto il flag a true, in modo che il testo non venga mostrato più volte
            
        PP.timers.add_timer(s, 2000, function(s) { // aggiunto un timer per rimuovere il testo dopo 3 secondi
            if (prendo_chiave_text) { // verifico se il testo esiste
                prendo_chiave_text.ph_obj.destroy(); // rimuovo il testo
                prendo_chiave_text = null; // imposto il testo a null
            }
        }, false); // imposto false per non ripetere il timer
    }
} 


function fish_vita_collision(s, player, fish_vita) {
    console.log("Collisione con il fish_vita!"); // log per verificare la collisione
    
    if (!text_vita_already_shown) { // creo il testo solo se non è mai stato mostrato prima
        prendo_vita_text = PP.shapes.text_add(s, 3328, 1100, ' "A" '); // creo il testo
        text_vita_already_shown = true;  // imposto il flag a true, in modo che il testo non venga mostrato più volte
            
        PP.timers.add_timer(s, 2000, function(s) { // aggiunto un timer per rimuovere il testo dopo 3 secondi
            if (prendo_vita_text) { // verifico se il testo esiste
                prendo_vita_text.ph_obj.destroy(); // rimuovo il testo
                prendo_vita_text = null; // imposto il testo a null
            }
        }, false); // imposto false per non ripetere il timer
    }
} 

function restore_vita(s) {
    if (!vita_01.ph_obj.visible) {
        // Restore vita_01
        vita_01.ph_obj.visible = true;
        console.log("Restored vita_01");
        return;
    } else if (!vita_02.ph_obj.visible) {
        // Restore vita_02
        vita_02.ph_obj.visible = true
        console.log("Restored vita_02");
        return;
    } else if (!vita_03.ph_obj.visible) {
        // Restore vita_03
        vita_03.ph_obj.visible = true
        console.log("Restored vita_03");
        return;
    } else {
        console.log("All vita objects are already active");
    }
}


function checkpoint_overlap(s, player, checkpoint) {
    if (passaggio_checkpoint) {
        return; // Se il checkpoint è già stato passato, esci dalla funzione
    }

    console.log("overlap con il checkpoint!"); // log per verificare la collisione
    passaggio_checkpoint = true; // imposto il flag per dire cheh il player ha passato il checkpoint

    PP.assets.sprite.animation_play(checkpoint, "bandiera_si_alza");
    PP.timers.add_timer(s, 1000, function(s) { // aggiunto un timer per rimuovere il testo dopo 3 secondi
    PP.assets.sprite.animation_play(checkpoint, "bandiera_svolazza");
    }, false); // imposto false per non ripetere il timer

    PP.game_state.set_variable("spawn_position_x", 2705);
    PP.game_state.set_variable("spawn_position_y", 483);
}


function scena_1_restart (s) {
    s.scene.start('scene1'); // parte la scena 1 di nuovo
    overlap_count = 0;
    can_overlap = true;
    game_over = false;
}


function bottiglia_collision(s, player, bottle) {
    console.log("Collisione con bottiglia!"); // log per verificare la collisione

    if (!text_already_shown) { // creo il testo solo se non è mai stato mostrato prima
        bottiglia_text = PP.shapes.text_add(s, 818, 1230, ' "A" '); // creo il testo
        text_already_shown = true;  // imposto il flag a true, in modo che il testo non venga mostrato più volte
        
        PP.timers.add_timer(s, 2000, function(s) { // aggiunto un timer per rimuovere il testo dopo 3 secondi
            if (bottiglia_text) { // verifico se il testo esiste
                bottiglia_text.ph_obj.destroy(); // rimuovo il testo
                bottiglia_text = null; // imposto il testo a null
            }
        }, false); // imposto false per non ripetere il timer
    }

}
        

function handle_interaction_bottiglia(s, player, object) {
    if (PP.interactive.kb.is_key_down(s, PP.key_codes.A)) {
        bottiglia_destroyed = false;
        console.log("Tasto A premuto!");
        player.ph_obj.anims.play("interazione", true); // fa partire l'animazione di interazione
        PP.timers.add_timer(s, 1000, function(s) { // aggiungi un timer per aspettare che l'animazione finisca
            if (object && object.ph_obj) { // se l'oggetto esiste e non è stato raccolto
                object.ph_obj.visible = false; // nasconde l'oggetto specifico
                object.ph_obj.body.enable = false; // disabilita il corpo fisico dell'oggetto
                bottiglia_destroyed = true; // setta il flag a true
                bottiglie_raccolte.add(object.name); // aggiunge la bottiglia raccolta all'insieme
            }
            
        }, false); // imposto false per non ripetere il timer
    } else {
        handle_damage_bottiglia(s, player, object); // gestisce il danno della bottiglia
        bottiglia_destroyed = false; // setta il flag a false
    }
}


function handle_damage_bottiglia(s, player, object) {
    if (!game_over) { // se non è game over, fa partire l'animazione hurt
        player.ph_obj.anims.play("hurt", true); // fa partire l'animazione hurt del player in loop continuo
    }

    if (!can_overlap) return; // se non è possibile fare overlap, esci dalla funzione
    overlap_count++; // incremento il contatore per il numero di overlap con la botiglia
    console.log("overlap_count: " + overlap_count); // log per verificare il contatore
    
    if (overlap_count === 1) { // se il contatore è uguale a 1
        console.log("Primo overlap con ${object.name}"); // log per verificare il primo overlap
        if (vita_03 && vita_03.ph_obj) { // verifico se esiste l'oggetto
            vita_03.ph_obj.visible = false; // nascondo l'oggetto
        }
        can_overlap = false; // imposto il flag a false, in modo che non sia possibile fare overlap
        
        PP.timers.add_timer(s, 3000, function(s) { // dopo 3 secondi, permettiamo il secondo overlap
            can_overlap = true; // imposto il flag a true, in modo che sia possibile fare overlap
        }, false);
        
    } else if (overlap_count === 2) { // se il contatore è uguale a 2
        console.log("Secondo overlap con ${object.name}"); // log per verificare il secondo overlap
        if (vita_02 && vita_02.ph_obj) { // verifico se esiste l'oggetto
            vita_02.ph_obj.visible = false; // nascondo l'oggetto
        }
        can_overlap = false; // imposto il flag a false, in modo che non sia possibile fare overlap
        
        PP.timers.add_timer(s, 3000, function(s) { // dopo altri 3 secondi, permettiamo il terzo overlap
            can_overlap = true; // imposto il flag a true, in modo che sia possibile fare overlap
        }, false); // imposto false per non ripetere il timer
        
    } else if (overlap_count === 3) { // se il contatore è uguale a 3
        console.log("Terzo overlap con ${object.name}"); // log per verificare il terzo overlap
        if (vita_01 && vita_01.ph_obj) { // verifico se esiste l'oggetto
            vita_01.ph_obj.visible = false; // nascondo l'oggetto
        }
        can_overlap = false; // imposto il flag a false, in modo che non sia possibile fare overlap

        if(!passaggio_checkpoint){ // se il player non è passato dal checkpoint
            game_over = true; // imposto il flag di game over
            console.log("il player non è passato dal chackpoint, quindi muore"); // log per verificare il game over
            player.ph_obj.anims.play("morte", true); // parte l'animazione morte
                PP.timers.add_timer(s, 2000, function(s) { // timer per cambiare scena dopo l'animazione
                    s.scene.start('game_over_scene'); // parte la game_over_scene
                }, false);
        } else if(passaggio_checkpoint){ // se il player è passato dal checkpoint
            game_over = true; // imposto il flag di game over
            console.log("il player è passato dal checkpoint, quindi muore, ma non riparte dall'inizio"); // log per verificare il game over
            player.ph_obj.anims.play("morte", true); // parte l'animazione morte
                PP.timers.add_timer(s, 2000, function(s) { // timer per cambiare scena dopo l'animazione
                   scena_1_restart(s); // parte la scena 1 di nuovo
                   scena_1_restarted = true; // setta il flag a true
                   can_overlap = true; // imposto il flag a true, in modo che sia possibile fare overlap
                }, false);
                        
        }
    } 
     
}


function handle_damage_pozze(s, player) {
    if (!game_over) { // se non è game over, fa partire l'animazione hurt
        player.ph_obj.anims.play("hurt", true); // fa partire l'animazione hurt del player in loop continuo
    }

    if (!can_overlap) return; // se non è possibile fare overlap, esci dalla funzione

    overlap_count++; // incremento il contatore per il numero di overlap con la botiglia
    
    if (overlap_count === 1) { // se il contatore è uguale a 1
        console.log("Primo overlap con la bottiglia!"); // log per verificare il primo overlap
        if (vita_03 && vita_03.ph_obj) { // verifico se esiste l'oggetto
            vita_03.ph_obj.visible = false; // distruggo l'oggetto
        }
        can_overlap = false; // imposto il flag a false, in modo che non sia possibile fare overlap
        
        PP.timers.add_timer(s, 3000, function(s) { // dopo 3 secondi, permettiamo il secondo overlap
            can_overlap = true;
        }, false);
        
    } else if (overlap_count === 2) { // se il contatore è uguale a 2
        console.log("Secondo overlap con la bottiglia!"); // log per verificare il secondo overlap
        if (vita_02 && vita_02.ph_obj) { // verifico se esiste l'oggetto
            vita_02.ph_obj.visible = false; // distruggo l'oggetto
        }
        can_overlap = false; // imposto il flag a false, in modo che non sia possibile fare overlap
        
        PP.timers.add_timer(s, 3000, function(s) { // dopo altri 3 secondi, permettiamo il terzo overlap
            can_overlap = true; 
        }, false); // imposto false per non ripetere il timer
        
    } else if (overlap_count === 3) { // se il contatore è uguale a 3
        console.log("Terzo overlap con la bottiglia!"); // log per verificare il terzo overlap
        if (vita_01 && vita_01.ph_obj) { // verifico se esiste l'oggetto
            vita_01.ph_obj.visible = false; // distruggo l'oggetto
        }
        
        if(!passaggio_checkpoint){
            game_over = true; // imposto il flag di game over
            console.log("il player non è passato dal chackpoint, quindi muore"); // log per verificare il game over
            player.ph_obj.anims.play("morte", true); // parte l'animazione morte
               PP.timers.add_timer(s, 2000, function(s) { // timer per cambiare scena dopo l'animazione
                    s.scene.start('game_over_scene'); // parte la game_over_scene
                }, false);
        } else if(passaggio_checkpoint){
            game_over = true; // imposto il flag di game over
            console.log("il player è passato dal checkpoint, quindi muore, ma non ricomincia dall'inizio"); // log per verificare il game over
            player.ph_obj.anims.play("morte", true); // parte l'animazione morte
            PP.timers.add_timer(s, 2000, function(s) { // timer per cambiare scena dopo l'animazione
               scena_1_restart(s); // parte la scena 1 di nuovo
               scena_1_restarted = true; // setta il flag a trueù
               can_overlap = true;
            }, false);
                        
        }
    } 
     
}


function corona_overlap(s, player, corona) {
    console.log("overlap con la corona!"); // log per verificare la collisione
        finale_corona = true; // imposto il flag per il finale corona
        }




function preload(s) {
    console.log("Executing preload() - SCENE 1");

    img_background_1 = PP.assets.image.load(s, "assets/images/background_parallax/layer_01_4416 x 1440.png"); // carico img piattaforme
    img_background_2 = PP.assets.image.load(s, "assets/images/background_parallax/layer_02_4416 x 1440.png"); // carico img colonne
    img_background_3 = PP.assets.image.load(s, "assets/images/background_parallax/layer_03_4416 x 1440.png"); // carico img rocce
    img_background_4 = PP.assets.image.load(s, "assets/images/background_parallax/layer_04_4416 x 1440.png"); // carico img mare

    // PRELOAD
    preload_HUD(s); 
    // preload player
    preload_player(s); 
    // preload oggetti
    preload_chiave(s); 
    preload_manopola(s);
    preload_tubo(s); 
    preload_bottiglie(s);
    // preload pesci
    preload_fish(s); 
    // preload ostacoli
    preload_pozze(s); 
    preload_reti(s);
    // preload traguardi
    preload_checkpoint(s); 
    preload_corona(s);  
}


function create(s) {
    console.log("Executing create() - SCENE 1");
    overlap_count = 0; // resetta il contatore di overlap - necessario post respawn
    can_overlap = true; // resetta il flag di overlap

    // creazione in ordine inverso: dal più lontano al più vicino
    background_4 = PP.assets.image.add(s, img_background_4, 0, 0, 0, 0);
    background_3 = PP.assets.image.add(s, img_background_3, 0, 0, 0, 0);
    background_2 = PP.assets.image.add(s, img_background_2, 0, 0, 0, 0);
    background_1 = PP.assets.image.add(s, img_background_1, 0, 0, 0, 0);

    bottiglia_raccolta_text = PP.shapes.text_add(s, 380, 45, `${bottiglia_raccolta_count}/10`); // creo il testo per il conteggio delle bottiglie raccolte
    bottiglia_raccolta_text.tile_geometry.scroll_factor_x = 0;
    bottiglia_raccolta_text.tile_geometry.scroll_factor_y = 0;

    fish_count_text = PP.shapes.text_add(s, 266, 45, `${fish_interaction_counter}/3`); // creo il testo per il conteggio dei pesci raccolti
    fish_count_text.tile_geometry.scroll_factor_x = 0;
    fish_count_text.tile_geometry.scroll_factor_y = 0;

    // CREATE
    create_platforms(s);
    // create traguardi
    create_checkpoint(s); 
    create_corona(s); 
    // create oggetti
    create_chiave(s); 
    create_manopola(s);
    create_tubo(s); 
    create_bottiglie(s);
    // create pesci
    create_fish(s);
    // create player
    create_player(s);
    // create ostacoli
    create_pozze(s); 
    create_reti(s); 
    // create HUD
    create_HUD(s); 
    
    // COLLIDER PLAYER e PLATFORMS
    PP.physics.add_collider(s, player, platform_0); 
    PP.physics.add_collider(s, player, platform_1); 
    PP.physics.add_collider(s, player, platform_2); 
    PP.physics.add_collider(s, player, platform_3); 
    PP.physics.add_collider(s, player, platform_4); 
    PP.physics.add_collider(s, player, platform_5); 
    PP.physics.add_collider(s, player, platform_6); 
    PP.physics.add_collider(s, player, platform_7); 
    PP.physics.add_collider(s, player, platform_8); 
    PP.physics.add_collider(s, player, platform_9); 
    PP.physics.add_collider(s, player, platform_10); 
    PP.physics.add_collider(s, player, platform_11); 
    PP.physics.add_collider(s, player, platform_12); 
    PP.physics.add_collider(s, player, platform_13); 
    PP.physics.add_collider(s, player, platform_14); 
    PP.physics.add_collider(s, player, platform_15);
    PP.physics.add_collider(s, player, platform_16); 
    PP.physics.add_collider(s, player, platform_17); 
    PP.physics.add_collider(s, player, platform_18); 
    PP.physics.add_collider(s, player, platform_19); 
    PP.physics.add_collider(s, player, platform_20); 
    PP.physics.add_collider(s, player, platform_21); 
    PP.physics.add_collider(s, player, platform_22); 
    PP.physics.add_collider(s, player, platform_23); 
    PP.physics.add_collider(s, player, platform_24); 
    PP.physics.add_collider(s, player, platform_25); 
    PP.physics.add_collider(s, player, platform_26); 
    PP.physics.add_collider(s, player, platform_27); 
    PP.physics.add_collider(s, player, platform_29); 
    PP.physics.add_collider(s, player, platform_30); 
    PP.physics.add_collider(s, player, platform_32); 
    PP.physics.add_collider(s, player, platform_33); 
    PP.physics.add_collider(s, player, platform_34); 
    PP.physics.add_collider(s, player, platform_35); 
    PP.physics.add_collider(s, player, platform_36); 
    PP.physics.add_collider(s, player, platform_37); 
    PP.physics.add_collider(s, player, platform_38); 
    PP.physics.add_collider(s, player, platform_39); 
    PP.physics.add_collider(s, player, platform_40); 
    PP.physics.add_collider(s, player, platform_41); 
    PP.physics.add_collider(s, player, platform_42); 
    PP.physics.add_collider(s, player, platform_43); 
    PP.physics.add_collider(s, player, platform_44); 
    PP.physics.add_collider(s, player, platform_45); 
    PP.physics.add_collider(s, player, platform_46);
    PP.physics.add_collider(s, player, platform_47); 
    PP.physics.add_collider(s, player, platform_48); 
    PP.physics.add_collider(s, player, platform_49); 
    PP.physics.add_collider(s, player, platform_50); 
    PP.physics.add_collider(s, player, platform_51); 
    PP.physics.add_collider(s, player, platform_52);
    PP.physics.add_collider(s, player, platform_53); 
    PP.physics.add_collider(s, player, platform_54); 
    PP.physics.add_collider(s, player, platform_55); 
    PP.physics.add_collider(s, player, platform_56); 

    PP.physics.add_collider(s, player, tubo); // collider tra il player e il tubo

    //NASCONDI BOTTIGLIE
    let bottiglie = [bottiglia1, bottiglia2, bottiglia3, bottiglia4, bottiglia5, bottiglia6, bottiglia7, bottiglia8, bottiglia9, bottiglia10];
    for (let i = 0; i < bottiglie.length; i++) {  //per ogni valore tra 1 e la linghezza dell'array, se una bottiglia è
        if(bottiglie_raccolte.has(bottiglie[i].name)){    //stata raccolta, nascondila
            bottiglie[i].ph_obj.visible = false;
            bottiglie[i].ph_obj.body.enable = false;
        }
}



    // COLLIDER PLAYER e PESCI (e chiamo funzione per gestire la collisione)
    PP.physics.add_collider_f(s, player, yellow_fish, yellow_fish_collision); 
    PP.physics.add_collider_f(s, player, fish_chiave, fish_chiave_collision);
    PP.physics.add_collider_f(s, player, fish_vita, fish_vita_collision);

    // COLLIDER PLAYER e OGGETTI (e chiamo funzione per gestire la collisione)
    PP.physics.add_collider_f(s, player, manopola, manopola_collision); 
    PP.physics.add_collider_f(s, player, getto_tubo, handle_damage_pozze); 


    // OVERLAP BOTTIGLIE
    PP.physics.add_overlap_f(s, player, bottiglia1, handle_interaction_bottiglia);
    PP.physics.add_overlap_f(s, player, bottiglia2, handle_interaction_bottiglia);
    PP.physics.add_overlap_f(s, player, bottiglia3, handle_interaction_bottiglia);
    PP.physics.add_overlap_f(s, player, bottiglia4, handle_interaction_bottiglia);
    PP.physics.add_overlap_f(s, player, bottiglia5, handle_interaction_bottiglia);
    PP.physics.add_overlap_f(s, player, bottiglia6, handle_interaction_bottiglia);
    PP.physics.add_overlap_f(s, player, bottiglia7, handle_interaction_bottiglia);
    PP.physics.add_overlap_f(s, player, bottiglia8, handle_interaction_bottiglia);
    PP.physics.add_overlap_f(s, player, bottiglia9, handle_interaction_bottiglia);
    PP.physics.add_overlap_f(s, player, bottiglia10, handle_interaction_bottiglia);

    // OVERLAP POZZE
    PP.physics.add_overlap_f(s, player, pozza_1, handle_damage_pozze); 
    PP.physics.add_overlap_f(s, player, pozza_2, handle_damage_pozze); 
    PP.physics.add_overlap_f(s, player, pozza_3, handle_damage_pozze); 

    // OVERLAP RETI
    PP.physics.add_overlap_f(s, player, rete_1, handle_damage_pozze);

    // OVERLAP TRAGUARDI
    PP.physics.add_overlap_f(s, player, checkpoint, checkpoint_overlap); 
    PP.physics.add_overlap_f(s, player, corona, corona_overlap); 

    // ANIMAZIONI
    // animazioni personaggi
    configure_player_animations(s); 
    configure_fish_animations(s);
    // animazioni oggetti
    configure_tubo_animations(s);
    configure_bottiglie_animations(s);
    configure_manopola_animations(s);
    // animazioni ostacoli
    configure_pozze(s);
    configure_reti_animations(s);
    // animazioni traguardi
    configure_checkpoint_animations(s);

    // CAMERA
    PP.camera.start_follow(s, player, -320, 50); // imposto la camera che segua il giocatore
};


function update(s) {
    //console.log("Executing update() - SCENE 1");
    if (!game_over) { // se il player può muoversi
        manage_player_update(s); // posizione del giocatore e animazioni
    }

    // CAMERA
    let cam_x = PP.camera.get_scroll_x(s); // ottieni la posizione della camera
    
    // aggiorna la posizione dei background con fattori di scroll diversi
    background_4.geometry.x = cam_x * 0.2;  // lo sfondo più lontano si muove più lentamente
    background_3.geometry.x = cam_x * 0.3;
    background_2.geometry.x = cam_x * 0.4; // lo sfondo più vicino si muove più velocemente
    

    // INTERAZIONE YELLOW_FISH
    if (PP.interactive.kb.is_key_down(s, PP.key_codes.A)) { // se premo A e il testo è stato mostrato
        const distance = Phaser.Math.Distance.Between(     // calcola la distanza tra il player e il pesce 
            player.ph_obj.x, 
            player.ph_obj.y,
            yellow_fish.ph_obj.x, 
            yellow_fish.ph_obj.y
        );

    // permetti l'interazione solo se il player è abbastanza vicino (per esempio, entro 100 pixel)
        if (distance <= 100 && !is_yellow_fish_dead) { // se il player è abbastanza vicino e il pesce non è morto
            console.log("Tasto A premuto e player vicino al pesce");

            player.ph_obj.anims.play("interazione", true); // fa partire l'animazione di interazione

            if (!is_yellow_fish_dead) { // verifica se l'animazione "morte" non è già stata avviata
                is_yellow_fish_dead = true; // imposta il flag a true
                curr_anim_yellow_fish = "morte"; // imposta l'animazione corrente a "morte"

                PP.assets.sprite.animation_stop(yellow_fish, "swim"); // ferma l'animazione swim del yellow fish
                PP.assets.sprite.animation_play(yellow_fish, "morte"); // fa partire l'animazione morte del yellow fish

                PP.timers.add_timer(s, 2000, function(s) { // aggiungi un timer per aspettare che l'animazione finisca
                    yellow_fish.ph_obj.destroy(); // distrugge completamente il pesciolino
                }, false); // imposto false per non ripetere il timer
            }
            
            if (!interacted_fish.has(yellow_fish)) {
                interacted_fish.add(yellow_fish);
                fish_interaction_counter++;
                console.log(`Fish interaction count: ${fish_interaction_counter}`);
            }
        }
    }

    // INTERAZIONE CHIAVE-MANOPOLA
    if (PP.interactive.kb.is_key_down(s, PP.key_codes.A) && text_chiave_already_shown) { // se premo A e il testo è stato mostrato
        // calcola la distanza tra il player e la chiave
        const distance = Phaser.Math.Distance.Between( 
            player.ph_obj.x, 
            player.ph_obj.y,
            chiave.ph_obj.x, 
            chiave.ph_obj.y
        );
    
        if (distance <= 100) {
            console.log("Tasto A premuto e player vicino alla chiave");
            
            player.ph_obj.anims.play("interazione", true); // fa partire l'animazione di interazione
            PP.assets.sprite.animation_play(fish_chiave, "liberazione"); // fa partire l'animazione liberazione del fish_chiave
            PP.timers.add_timer(s, 400, function(s) { // aggiungi un timer per aspettare che l'animazione finisca
            PP.assets.sprite.animation_play(fish_chiave, "liberazione_2"); // fa partire l'animazione liberazione_2 del fish_chiave
            }, false); // imposto false per non ripetere il timer
    
            PP.timers.add_timer(s, 600, function(s) { // aggiungi un timer per aspettare che l'animazione finisca
                console.log("Tasto A premuto, inizia a seguire!"); 
                ShouldFollow = true; // Imposta la variabile per iniziare a seguire
            }, false); // imposto false per non ripetere il timer

            if (!interacted_fish.has(fish_chiave)) {
                interacted_fish.add(fish_chiave);
                fish_interaction_counter++;
                console.log(`Fish interaction count: ${fish_interaction_counter}`);
            }
        }
    }

    // INTERAZIONE FISH_VITA
    if (PP.interactive.kb.is_key_down(s, PP.key_codes.A) && text_vita_already_shown) { // se premo A e il testo è stato mostrato
        const distance = Phaser.Math.Distance.Between( 
            player.ph_obj.x, 
            player.ph_obj.y,
            fish_vita.ph_obj.x, 
            fish_vita.ph_obj.y
        );
    
        if (distance <= 100) {
            console.log("Tasto A premuto e player vicino alla chiave");

            if (interacted_fish.has(fish_vita)) {return}// calcola la distanza tra il player e il fish_vita
            else {
            player.ph_obj.anims.play("interazione", true); // fa partire l'animazione di interazione
            PP.assets.sprite.animation_play(fish_vita, "liberazione"); // fa partire l'animazione liberazione del fish_vita
            PP.timers.add_timer(s, 200, function(s) { // aggiungi un timer per aspettare che l'animazione finisca
            PP.assets.sprite.animation_play(fish_chiave, "liberazione_2"); // fa partire l'animazione liberazione_2 del fish_vita
            }, false); // imposto false per non ripetere il timer
    
            PP.timers.add_timer(s, 600, function(s) { // aggiungi un timer per aspettare che l'animazione finisca
                console.log("Tasto A premuto, dona una vita!"); 
                restore_vita(s);
                // aggiungi una vita
            }, false); // imposto false per non ripetere il timer
        
            PP.assets.sprite.animation_play(fish_vita, "liberazione_2"); 
            interacted_fish.add(fish_vita); 
            fish_interaction_counter++; 
            overlap_count--;
            console.log(`Fish interaction count: ${fish_interaction_counter}`);
            }
                
        }
    }


    // INTERAZIONE MANOPOLA
    if (PP.interactive.kb.is_key_down(s, PP.key_codes.A) && text_manopola_already_shown) { // se premo A e il testo è stato mostrato
        // calcola la distanza tra il player e la manopola
        const distance = Phaser.Math.Distance.Between( 
            player.ph_obj.x, 
            player.ph_obj.y,
            manopola.ph_obj.x, 
            manopola.ph_obj.y
        );
        console.log(distance);
        
        // permetti l'interazione solo se il player è abbastanza vicino (per esempio, entro 100 pixel)
        if (distance <= 200) {
            console.log("Tasto A premuto e player vicino alla manopola");
            
            player.ph_obj.anims.play("interazione", true); // fa partire l'animazione di interazione    
            PP.assets.sprite.animation_play(manopola, "manopola_gira"); // fa partire l'animazione manopola_gira 
            PP.timers.add_timer(s, 2000, function(s) { // aggiungi un timer per aspettare che l'animazione finisca
                if (ShouldFollow) {
                    getto_tubo.ph_obj.destroy(); // distrugge completamente il getto
                    console.log("Getto distrutto!");
                    Chiave_con_Manopola = true; // Imposta la variabile per indicare che il getto è stato spento
                }
            }, false); // imposto false per non ripetere il timer
        }
    }
    
    // Verifica se il giocatore si trova nella posizione desiderata
    if (player.geometry.x === 1076) {
        console.log("Il giocatore si trova nella posizione desiderata!");
        bottle_text = PP.shapes.text_add(s, 1076, 983, ' "A" '); // creo il testo
        }
    
    // logica per l'interazione con la chiave
     if(ShouldFollow){
        chiave.geometry.x = player.geometry.x - 30;  // Imposta la posizione della chiave( segue il player)
        chiave.geometry.y = player.geometry.y - 30;
    }

    if(Chiave_con_Manopola){    //quando il getto è stato spento, la chiave rimane dove cè la manopola
        chiave.geometry.x = 3481;
        chiave.geometry.y = 245;
    }

    if(finale_corona){
        console.log("Il giocatore ha raccolto la corona!");
        if(bottiglia_raccolta_count >= 4){
            console.log("Il giocatore ha raccolto tutte le bottiglie!");
            s.scene.start('finale_completo_scene'); // parte finale_completo_scene
        }
        else{s.scene.start('finale_corona_scene')}; // parte la finale_corona_scene)
        finale_corona = false;
    }

    if (fish_interaction_counter) {
        fish_count_text.ph_obj.setText(`${fish_interaction_counter}/3`); // aggiorna il testo con il conteggio dei pesci raccolti
    }
    
    // COUNTER BOTTIGLIE
    if (bottiglia_raccolta_text) {
        bottiglia_raccolta_text.ph_obj.setText(`${bottiglia_raccolta_count}/10`);
    }
 
    if (bottiglia_destroyed && !prev_bottiglia_destroyed){
        ++bottiglia_raccolta_count
        prev_bottiglia_destroyed = bottiglia_destroyed;
    }

    if (!bottiglia_destroyed) {
        prev_bottiglia_destroyed = false
    }
}



function destroy(s) {
    console.log("Executing destroy() - SCENE 1");
}

PP.scenes.add("scene1", preload, create, update, destroy);