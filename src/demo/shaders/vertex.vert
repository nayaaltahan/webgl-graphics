attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec4 aVertexColor;
uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
varying lowp vec4 vColor;
varying highp vec3 vLighting;
void main(void){
  gl_Position=uProjectionMatrix*uModelViewMatrix*aVertexPosition;
  vColor=aVertexColor;
  
  // Apply lighting effect
  highp vec3 ambientLight=vec3(.3,.3,.3);
  highp vec3 directionalLightColor=vec3(1,1,1);
  highp vec3 directionalVector=normalize(vec3(.85,.8,.75));
  highp vec4 transformedNormal=uNormalMatrix*vec4(aVertexNormal,1.);
  highp float directional=max(dot(transformedNormal.xyz,directionalVector),0.);
  vLighting=ambientLight+(directionalLightColor*directional);
}