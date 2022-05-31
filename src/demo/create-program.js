import loadShader from './create-shader';


const initShaderProgram = (gl, shaderData) => {

  const program = gl.createProgram();

  const shaders = shaderData
    .map(s => loadShader(gl, s.src, s.type));
    
  shaders.forEach(s => gl.attachShader(program, s));

  gl.linkProgram(program);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
    return null;
  }

  return program;
};

export default initShaderProgram;
