
import { mat4 , vec3, vec4} from "gl-matrix";
import webglUtils from "./webgl-utils";

const drawScene = (gl, programInfo, buffers, cubeRotation, gui, material) => {
  gl.clearColor(0.6, 0.6, 0.6, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
    fieldOfView,
    aspect,
    zNear,
    zFar);

  // create the view matrix
  let viewMatrix = mat4.create();
  mat4.identity(viewMatrix);
  mat4.lookAt(viewMatrix, [-7.0, 5.0, 10.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
    modelViewMatrix,     // matrix to translate
    [-0.0, 0.0, -0.0]);  // amount to translate
  mat4.rotate(modelViewMatrix,  // destination matrix
    modelViewMatrix,  // matrix to rotate
    cubeRotation,     // amount to rotate in radians
    [0, 0, gui.model_Z]);       // axis to rotate around (Z)
  mat4.rotate(modelViewMatrix,  // destination matrix
    modelViewMatrix,  // matrix to rotate
    cubeRotation ,// amount to rotate in radians
    [0, gui.model_Y, 0]);       // axis to rotate around (Y)

  mat4.rotate(modelViewMatrix,  // destination matrix
    modelViewMatrix,  // matrix to rotate
    cubeRotation ,// amount to rotate in radians
    [gui.model_X, 0, 0]);       // axis to rotate around (X)

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.attribs.a_position.buffer);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL which indices to use to index the vertices

  //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL how to pull out the normals from
  // the normal buffer into the vertexNormal attribute.
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.attribs.a_normal.buffer);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexNormal,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexNormal);
  }

  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix);

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.viewMatrix,
    false,
    viewMatrix);

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix);

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.normalMatrix,
    false,
    normalMatrix);

  let modelColor = vec4.create();
  const r = gui.color[0];
  const g = gui.color[1];
  const b = gui.color[2];
  const a = gui.color[3];
  vec4.set(modelColor, r/255,g/255,b/255,a);
  
  gl.uniform4fv(
    programInfo.uniformLocations.vertexColor, 
    modelColor);

  // Add lighting to scene
  let source_direction = vec3.create();
  vec3.set(source_direction, gui.source_directionX, gui.source_directionY, gui.source_directionZ);

  gl.uniform3fv(programInfo.uniformLocations.sourceDirection
    , source_direction);

  
  // handle models
  if(gui.model_type == "Monkey"){
    gl.uniform1i(programInfo.uniformLocations.isObj, true);

    // handle additional model attributes 
    //programInfo.attribLocations.vertexTexcoord = gl.getAttribLocation(shaderProgram, 'aTexcoord');
    //programInfo.attribLocations.attributeColor = gl.getAttribLocation(shaderProgram, 'aColor');

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.attribs.a_texcoord.buffer);
    
    gl.bindTexture(gl.TEXTURE_2D, material.diffuseMap);
    gl.uniform1i(programInfo.uniformLocations.diffuseMap, 0);
    
  }
  else{
    gl.uniform1i(programInfo.uniformLocations.isObj, false);
  }

  // Add outline 
  // draw outline
  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.FRONT);
  let modelMatrixOutline = mat4.create();
  // TODO add thickness scale from gui
  mat4.scale(modelMatrixOutline, modelViewMatrix, [1.015, 1.015, 1.015]);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelMatrixOutline);
  gl.uniform1f(programInfo.uniformLocations.outline, 0.0);
  webglUtils.drawBufferInfo(gl, buffers);



  // draw FRONT_Face
  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.BACK);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
  gl.uniform1f(programInfo.uniformLocations.outline, 1.0);

  // draw buffer info
  webglUtils.drawBufferInfo(gl, buffers);
    
}

export default drawScene;
