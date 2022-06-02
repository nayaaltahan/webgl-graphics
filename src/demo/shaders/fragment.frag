precision highp float;

uniform vec3 uSourceDirection;
uniform float uOutline;
uniform sampler2D diffuseMap;
uniform bool isObj;

varying lowp vec4 vColor;
varying vec3 vNormal;
varying vec3 vVertPos;
varying vec2 vTexcoord;

void main(void){
  vec3 lightDir = normalize(uSourceDirection - vVertPos);
  vec3 lightNormal = normalize(lightDir);
  float diffuse = dot(vNormal, lightNormal);
  vec3 effectiveDiffuse;

if(isObj){
  vec4 diffuseMapColor = texture2D(diffuseMap, vTexcoord);
  effectiveDiffuse = diffuseMapColor.rgb;
}
else{
  effectiveDiffuse = vColor.rgb;
}

  if(diffuse > 0.95){
    diffuse = 0.1;
  }
  else if(diffuse > 0.05){
    diffuse = 0.0;
  }
  else {
    diffuse = -0.1;
  }

  vec3 color = vec3(effectiveDiffuse.x + diffuse, effectiveDiffuse.y + diffuse, effectiveDiffuse.z + diffuse);
  color *= uOutline;
  gl_FragColor = vec4(color,1.0);
}