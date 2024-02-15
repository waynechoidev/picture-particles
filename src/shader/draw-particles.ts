export const drawParticlesVS = `#version 300 es
  in vec2 pos;
  in vec2 tex;
  out vec2 texCoord;

  uniform mat4 matrix;
  uniform vec2 canvasSize;
  uniform vec2 picSize;

  void main() {
    // do the common matrix math
    gl_Position = matrix * vec4(pos, 0.0, 1.0);
    gl_PointSize = 1.0;
    
    texCoord = tex;
  }
  `;

export const drawParticlesFS = `#version 300 es
  precision highp float;

  in vec2 texCoord;
  out vec4 outColor;
  
  uniform sampler2D uImage;
  
  void main() {
    outColor = texture(uImage, texCoord);
  }
  `;
