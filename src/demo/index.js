// This demo is from an anonymous Codepen.
// It has been modified to stop it having dependencies
// and been split up into seperate files.
// This is probably not a good resource to learn
// from as it has not been well thought out!
// https://codepen.io/anon/pen/EQLERV

import fragmentShaderSrc from './shaders/fragment.frag';
import vertexShaderSrc from './shaders/vertex.vert';
import resizeCanvas from './resize-canvas';
import createProgram from './create-program';
import createBuffer from './create-buffer';
import draw from './draw';

import { mat4 } from 'gl-matrix';
var cubeRotation = 0.0;

const demo = () => {
  // Create program
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  if (!canvas) {
    alert('Cant find canvas');
    return;
  }

  const shaders = [
    { src: fragmentShaderSrc, type: gl.FRAGMENT_SHADER },
    { src: vertexShaderSrc, type: gl.VERTEX_SHADER }
  ];

  const program = createProgram(gl, shaders);

  // Set up attributes and uniforms
  const programInfo = {
    program: program,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(program, 'aVertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix'),
    },
  };

  const buffers = createBuffer(gl);

  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    draw(gl, mat4, programInfo, buffers, deltaTime, cubeRotation);
    
    // Update the rotation for the next draw

    cubeRotation += deltaTime;

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

}

export default demo;
