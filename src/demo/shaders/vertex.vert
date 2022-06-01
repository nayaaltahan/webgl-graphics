attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec4 aVertexColor;

uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

varying lowp vec4 vColor;
varying vec3 vNormal;
varying vec3 vVertPos;
void main(void){
  vec3 N = normalize(aVertexNormal);
  vNormal = (uNormalMatrix * vec4(N,1.0)).xyz;
  vVertPos = (uViewMatrix * uModelViewMatrix * vec4(aVertexPosition.xyz, 1.0)).xyz;
  gl_Position=uProjectionMatrix * uViewMatrix * uModelViewMatrix * vec4(aVertexPosition.xyz, 1.0);
  vColor=aVertexColor;
}