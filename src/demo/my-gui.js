import * as dat from 'dat.gui';

const myGUI = (gl) => {
    var settingGUI = {

        model_X: 0.0,
        model_Y: 1.0,
        model_Z: 0.0,

        source_directionX: 5.0,
        source_directionY: 5.0,
        source_directionZ: 5.0,

        color: [ 0, 128, 255, 1 ], // RGB with alpha

        model_type: 'Monkey',

        SHADOW_MAP_SIZE: 128,

    }

    var guiButton = function () {

        this.SHADOW_MAP_SIZE = function () {

            if (settingGUI.SHADOW_MAP_SIZE < 2000) {
                settingGUI.SHADOW_MAP_SIZE = settingGUI.SHADOW_MAP_SIZE * 2;
            } else {
                settingGUI.SHADOW_MAP_SIZE = 32;
            }
            console.log("SHADOW_MAP_SIZE = " + settingGUI.SHADOW_MAP_SIZE);

        };

    };

    let gui = new dat.GUI();

    // gui.add(settingGUI,'rotateX').min(-1.0).max(1.0).step(0.1);
    var source_direction = gui.addFolder('source direction');
    source_direction.add(settingGUI, 'source_directionX').min(-15.0).max(15.0).step(0.1);
    source_direction.add(settingGUI, 'source_directionY').min(0.0).max(15.0).step(0.1);
    source_direction.add(settingGUI, 'source_directionZ').min(-15.0).max(15.0).step(0.1);
    source_direction.open()

    var model = gui.addFolder('Model Rotation Direction');
    model.add(settingGUI, 'model_X').min(-1.0).max(1.0).step(1);
    model.add(settingGUI, 'model_Y').min(-1.0).max(1.0).step(1);
    model.add(settingGUI, 'model_Z').min(-1.0).max(1.0).step(1);

    model.open();

    gui.addColor(settingGUI, 'color');

    // Model type
    gui.add(settingGUI, 'model_type', [ 'Cube', 'Sphere', 'Cone', 'Monkey' ] );

    //gui.add(text,'SHADOW_MAP_SIZE');

    return settingGUI;
}

export default myGUI;
