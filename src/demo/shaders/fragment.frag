precision highp float;

uniform vec3 uSourceDirection;

varying lowp vec4 vColor;
varying vec3 vNormal;
varying vec3 vVertPos;

void main(void){
  vec3 lightDir = normalize(uSourceDirection - vVertPos);
  vec3 lightNormal = normalize(lightDir);
  float diffuse = dot(vNormal, lightNormal);

  if(diffuse > 0.95){
    diffuse = 0.1;
  }
  else if(diffuse > 0.05){
    diffuse = 0.0;
  }
  else {
    diffuse = -0.1;
  }

  vec3 color = vec3(vColor.x + diffuse, vColor.y + diffuse, vColor.z + diffuse);
  gl_FragColor = vec4(color,1.0);
}