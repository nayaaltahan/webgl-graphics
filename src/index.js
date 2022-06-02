import fsSource from './demo/shaders/fragment.frag';
import vsSource from './demo/shaders/vertex.vert';
import initBuffers from './demo/create-buffer';
import drawScene from './demo/draw';
import initShaderProgram from './demo/create-program';
import myGUI from './demo/my-gui';
import myPrimitives from './demo/my-primitives';


var cubeRotation = 0.0;

main();

//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // initialize GUI with settings 
  let gui = myGUI();

  const shaders = [
    { src: fsSource, type: gl.FRAGMENT_SHADER },
    { src: vsSource, type: gl.VERTEX_SHADER }
  ];

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, shaders);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVertexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
    },
    uniformLocations: {
      sourceDirection: gl.getUniformLocation(shaderProgram, 'uSourceDirection'),
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      viewMatrix: gl.getUniformLocation(shaderProgram, 'uViewMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      vertexColor: gl.getUniformLocation(shaderProgram, 'uVertexColor'),
      outline: gl.getUniformLocation(shaderProgram, 'uOutline'),
    }
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  //const buffers = initBuffers(gl);


  // create buffers and fill with data for various things.
  const bufferInfos = {
    "Cube": myPrimitives(gl, "Cube", {
      width: 5,
      height: 5,
      depth: 5
  }),
    "Sphere": myPrimitives(gl, "Sphere", {
      radius: 3,
      subdivisionsAround: 30,
      subdivisionsDown: 30
  }),
    "Cone": myPrimitives(gl, "Cone", {
      bottomRadius: 3,
      topRadius: 0,
      height: 6,
      subdivisionsAround: 30,
      subdivisionsDown: 1
  })
  }

  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    var bufferInfo = bufferInfos[gui.model_type];

    
    drawScene(gl, programInfo, bufferInfo, cubeRotation, gui);
    
    // Update the rotation for the next draw

    cubeRotation += deltaTime;

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

