let bottiglia1, bottiglia2, bottiglia3, bottiglia4, bottiglia5, bottiglia6, bottiglia7, bottiglia8, bottiglia9, bottiglia10;
let bottiglia_position = [
    { x: 1122, y: 945 },
    { x: 1033, y: 433 },
    { x: 3167, y: 827 },
    { x: 819, y: 105 },
    { x: 1223, y: 1331 },
    { x: 2163, y: 1132 },
    { x: 3209, y: 1308 },
    { x: 2337, y: 109 },
    { x: 2030, y: 647 },
    { x: 4027, y: 668 }
];


    
function configure_bottiglie_animations(s) {
    let bottiglie = [bottiglia1, bottiglia2, bottiglia3, bottiglia4, bottiglia5, bottiglia6, bottiglia7, bottiglia8, bottiglia9, bottiglia10];    
    for (let i = 0; i < bottiglie.length; i++) {
            PP.assets.sprite.animation_add(bottiglie[i], `bottiglia${i + 1}_anim`, 0, 1, 5, -1);
            PP.assets.sprite.animation_play(bottiglie[i], `bottiglia${i + 1}_anim`);
        }
    }

function preload_bottiglie(s) {
        bottiglia1 = PP.assets.sprite.load_spritesheet(s, `assets/images/plastic/spritesheet_bott1.png`, 73, 73);
        bottiglia2 = PP.assets.sprite.load_spritesheet(s, `assets/images/plastic/spritesheet_bott2.png`, 73, 73);
        bottiglia3 = PP.assets.sprite.load_spritesheet(s, `assets/images/plastic/spritesheet_bott3.png`, 73, 73);
        bottiglia4 = PP.assets.sprite.load_spritesheet(s, `assets/images/plastic/spritesheet_bott4.png`, 73, 73);
        bottiglia5 = PP.assets.sprite.load_spritesheet(s, `assets/images/plastic/spritesheet_bott5.png`, 73, 73);
        bottiglia6 = PP.assets.sprite.load_spritesheet(s, `assets/images/plastic/spritesheet_bott6.png`, 73, 73);
        bottiglia7 = PP.assets.sprite.load_spritesheet(s, `assets/images/plastic/spritesheet_bott7.png`, 73, 73);
        bottiglia8 = PP.assets.sprite.load_spritesheet(s, `assets/images/plastic/spritesheet_bott8.png`, 73, 73);
        bottiglia9 = PP.assets.sprite.load_spritesheet(s, `assets/images/plastic/spritesheet_bott9.png`, 73, 73);
        bottiglia10 = PP.assets.sprite.load_spritesheet(s, `assets/images/plastic/spritesheet_bott10.png`, 73, 73);
}

function create_bottiglie(s) {
    bottiglia1 = PP.assets.sprite.add(s, bottiglia1, bottiglia_position[0].x, bottiglia_position[0].y, 0, 0);
    bottiglia2 = PP.assets.sprite.add(s, bottiglia2, bottiglia_position[1].x, bottiglia_position[1].y, 0, 0);
    bottiglia3 = PP.assets.sprite.add(s, bottiglia3, bottiglia_position[2].x, bottiglia_position[2].y, 0, 0);
    bottiglia4 = PP.assets.sprite.add(s, bottiglia4, bottiglia_position[3].x, bottiglia_position[3].y, 0, 0);
    bottiglia5 = PP.assets.sprite.add(s, bottiglia5, bottiglia_position[4].x, bottiglia_position[4].y, 0, 0);
    bottiglia6 = PP.assets.sprite.add(s, bottiglia6, bottiglia_position[5].x, bottiglia_position[5].y, 0, 0);
    bottiglia7 = PP.assets.sprite.add(s, bottiglia7, bottiglia_position[6].x, bottiglia_position[6].y, 0, 0);
    bottiglia8 = PP.assets.sprite.add(s, bottiglia8, bottiglia_position[7].x, bottiglia_position[7].y, 0, 0);
    bottiglia9 = PP.assets.sprite.add(s, bottiglia9, bottiglia_position[8].x, bottiglia_position[8].y, 0, 0);
    bottiglia10 = PP.assets.sprite.add(s, bottiglia10, bottiglia_position[9].x, bottiglia_position[9].y, 0, 0);

    let bottiglie = [bottiglia1, bottiglia2, bottiglia3, bottiglia4, bottiglia5, bottiglia6, bottiglia7, bottiglia8, bottiglia9, bottiglia10];
    for (let i = 0; i < bottiglie.length; i++) {
        PP.physics.add(s, bottiglie[i], PP.physics.type.STATIC);
        PP.physics.set_collision_rectangle(bottiglie[i], 30, 40, 20, 20);
        bottiglie[i].name = `bottiglia${i + 1}`;
    }
}
