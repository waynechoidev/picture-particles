var y=Object.defineProperty;var I=(r,t,i)=>t in r?y(r,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[t]=i;var n=(r,t,i)=>(I(r,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();class U{constructor(t,i){n(this,"_canvas");n(this,"_gl");this._canvas=document.getElementById("canvas"),this._canvas.width=t,this._canvas.height=i,this._gl=this._canvas.getContext("webgl2"),this._gl||alert("Cannot use webgl2"),this.createWindow()}get gl(){return this._gl}makeVertexArray(t){const i=this._gl.createVertexArray();this._gl.bindVertexArray(i);for(const[s,e]of t){this._gl.bindBuffer(this._gl.ARRAY_BUFFER,s);for(let o=0;o<e.length;o++)this._gl.enableVertexAttribArray(e[o]),this._gl.vertexAttribPointer(e[o],2,this._gl.FLOAT,!1,0,4*2*o)}return i}makeTransformFeedback(t){const i=this._gl.createTransformFeedback();return this._gl.bindTransformFeedback(this._gl.TRANSFORM_FEEDBACK,i),this._gl.bindBufferBase(this._gl.TRANSFORM_FEEDBACK_BUFFER,0,t),i}makeBuffer(t,i=this._gl.STATIC_DRAW){const s=this._gl.createBuffer();return this._gl.bindBuffer(this._gl.ARRAY_BUFFER,s),this._gl.bufferData(this._gl.ARRAY_BUFFER,t,i),s}createWindow(){const t=this._gl;this.resizeCanvasToDisplaySize(t.canvas),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(1,1,1,1),t.enable(t.DEPTH_TEST),t.enable(t.CULL_FACE)}resizeCanvasToDisplaySize(t,i=1){const s=t.clientWidth*i|0,e=t.clientHeight*i|0;return t.width!==s||t.height!==e?(t.width=s,t.height=e,!0):!1}}const B=(r,t)=>(t===void 0&&(t=r,r=0),Math.random()*(t-r)+r),C=(r,t)=>new Array(r).fill(0).map(i=>t.map(s=>B(s[0],s[1]))).flat(),V=(r,t,i,s)=>{const e=Math.floor((r-i)/2),o=Math.floor((t-s)/2),a=[];for(let c=o;c<o+s;c++)for(let l=e;l<e+i;l++)a.push(l,c),a.push(l,c);return a},N=(r,t,i,s,e,o)=>[2/(t-r),0,0,0,0,2/(s-i),0,0,0,0,2/(e-o),0,(r+t)/(r-t),(i+s)/(i-s),(e+o)/(e-o),1],O=(r,t)=>{const i={...r};Object.assign(r,t),Object.assign(t,i)};class P{constructor(t,i,s,e){n(this,"_gl");n(this,"_program");this._gl=t,this._program=this.createProgram(i,s,e)}addAttrib(t){return this._gl.getAttribLocation(this._program,t)}addUniform(t){return this._gl.getUniformLocation(this._program,t)}use(){this._gl.useProgram(this._program)}createProgram(t,i,s){const e=this._gl.createProgram();e||console.error("failed to creat a program.");const o=this.createShader(this._gl.VERTEX_SHADER,t),a=this.createShader(this._gl.FRAGMENT_SHADER,i);return this._gl.attachShader(e,o),this._gl.attachShader(e,a),s&&this._gl.transformFeedbackVaryings(e,s,this._gl.SEPARATE_ATTRIBS),this._gl.linkProgram(e),this._gl.getProgramParameter(e,this._gl.LINK_STATUS)||(console.error(this._gl.getProgramInfoLog(e)),this._gl.deleteProgram(e)),e}createShader(t,i){const s=this._gl,e=s.createShader(t);if(e){if(s.shaderSource(e,i),s.compileShader(e),s.getShaderParameter(e,s.COMPILE_STATUS))return e;console.log(s.getShaderInfoLog(e)),s.deleteShader(e)}else console.error(`failed to creat a shader type ${t}.`)}}const L=`#version 300 es
  in vec2 oldPosition;
  in vec2 velocity;

  uniform float deltaTime;
  uniform vec2 canvasDimensions;

  out vec2 newPosition;

  vec2 euclideanModulo(vec2 n, vec2 m) {
  	return mod(mod(n, m) + m, m);
  }

  void main() {
    newPosition = euclideanModulo(
        oldPosition + velocity * deltaTime,
        canvasDimensions);
  }
  `,M=`#version 300 es
  precision highp float;
  void main() {
  }
  `;class k extends P{constructor(i){super(i,L,M,["newPosition"]);n(this,"_oldPosition");n(this,"_velocity");n(this,"_canvasDimensions");n(this,"_deltaTime");this._oldPosition=this.addAttrib("oldPosition"),this._velocity=this.addAttrib("velocity"),this._canvasDimensions=this.addUniform("canvasDimensions"),this._deltaTime=this.addUniform("deltaTime")}get oldPosition(){return this._oldPosition}get velocity(){return this._velocity}get canvasDimensions(){return this._canvasDimensions}get deltaTime(){return this._deltaTime}}const X=`#version 300 es
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
  `,G=`#version 300 es
  precision highp float;

  in vec2 texCoord;
  out vec4 outColor;
  
  uniform sampler2D uImage;
  
  void main() {
    outColor = texture(uImage, texCoord);
  }
  `;class W extends P{constructor(i){super(i,X,G);n(this,"_position");n(this,"_texPos");n(this,"_matrixUniform");this._position=this.addAttrib("pos"),this._texPos=this.addAttrib("tex"),this._matrixUniform=this.addUniform("matrix")}get position(){return this._position}get texPos(){return this._texPos}get matrixUniform(){return this._matrixUniform}}class Y{constructor(t){n(this,"_gl");n(this,"_textureID");this._gl=t,this._textureID=t.createTexture()}initialise(t){this._gl.bindTexture(this._gl.TEXTURE_2D,this._textureID),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_S,this._gl.CLAMP_TO_EDGE),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_T,this._gl.CLAMP_TO_EDGE),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_MIN_FILTER,this._gl.LINEAR),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_MAG_FILTER,this._gl.LINEAR),this._gl.texImage2D(this._gl.TEXTURE_2D,0,this._gl.RGB,this._gl.RGB,this._gl.UNSIGNED_BYTE,t),this._gl.bindTexture(this._gl.TEXTURE_2D,null)}use(){this._gl.activeTexture(this._gl.TEXTURE0),this._gl.bindTexture(this._gl.TEXTURE_2D,this._textureID)}update(t){this.use(),this._gl.texImage2D(this._gl.TEXTURE_2D,0,this._gl.RGB,this._gl.RGB,this._gl.UNSIGNED_BYTE,t)}}const T=window.innerWidth,A=window.innerHeight,E=600,R=800;function H(){const r=new U(T,A),t=r.gl,i=new Y(t),s=new Image;s.src="img.jpg",s.onload=()=>{i.initialise(s)};const e=new k(t),o=new W(t),a=E*R,c=new Float32Array(V(T,A,E,R)),l=new Float32Array(C(a,[[-0,0],[-0,0]])),_=r.makeBuffer(c,t.DYNAMIC_DRAW),d=r.makeBuffer(c,t.DYNAMIC_DRAW),u=r.makeBuffer(l,t.STATIC_DRAW),v=r.makeVertexArray([[_,[e.oldPosition]],[u,[e.velocity]]]),p=r.makeVertexArray([[d,[e.oldPosition]],[u,[e.velocity]]]),x=r.makeVertexArray([[_,[o.position,o.texPos]]]),D=r.makeVertexArray([[d,[o.position,o.texPos]]]),S=r.makeTransformFeedback(_),F=r.makeTransformFeedback(d);t.bindBuffer(t.ARRAY_BUFFER,null),t.bindBuffer(t.TRANSFORM_FEEDBACK_BUFFER,null);let h={updateVA:v,tf:F,drawVA:D},b={updateVA:p,tf:S,drawVA:x},m=0;function f(g){g*=.001;const w=g-m;m=g,t.clear(t.COLOR_BUFFER_BIT),e.use(),t.bindVertexArray(h.updateVA),t.uniform2f(e.canvasDimensions,t.canvas.width,t.canvas.height),t.uniform1f(e.deltaTime,w),t.enable(t.RASTERIZER_DISCARD),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,h.tf),t.beginTransformFeedback(t.POINTS),t.drawArrays(t.POINTS,0,a),t.endTransformFeedback(),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,null),t.disable(t.RASTERIZER_DISCARD),o.use(),i.use(),t.bindVertexArray(h.drawVA),t.viewport(0,0,t.canvas.width,t.canvas.height),t.uniformMatrix4fv(o.matrixUniform,!1,N(0,t.canvas.width,0,t.canvas.height,-1,1)),t.drawArrays(t.POINTS,0,a),O(h,b),requestAnimationFrame(f)}requestAnimationFrame(f)}H();
