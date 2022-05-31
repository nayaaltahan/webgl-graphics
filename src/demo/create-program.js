import createShader from './create-shader';

const createProgram = (gl, shaderData) => {
  const program = gl.createProgram();

  const shaders = shaderData
    .map(s => createShader(gl, s.src, s.type))
    .forEach(s => gl.attachShader(program, s));

  gl.linkProgram(program);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
    return null;
  }

  return program;
};

export default createProgram;
