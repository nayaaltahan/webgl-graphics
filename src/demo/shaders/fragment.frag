precision highp float;

uniform vec3 uSourceDirection;

varying lowp vec4 vColor;
varying vec3 vNormal;
varying vec3 vVertPos;

void main(void){
  vec3 lightDir = normalize(uSourceDirection - vVertPos);
  vec3 lightNormal = normalize(lightDir);
  float diffuse = dot(vNormal, lightNormal);

  if(diffuse > 0.9){
    diffuse = 1.0;
  }
  else if(diffuse > 0.1){
    diffuse = 0.7;
  }
  else {
    diffuse = 0.3;
  }

  vec3 color = vec3(0.9, diffuse, 0.0);
  gl_FragColor = vec4(color,1.0);
}