var L=Object.defineProperty;var N=(s,t,i)=>t in s?L(s,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[t]=i;var n=(s,t,i)=>(N(s,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();class O{constructor(t,i){n(this,"_canvas");n(this,"_gl");this._canvas=document.getElementById("canvas"),this._canvas.width=t,this._canvas.height=i,this._gl=this._canvas.getContext("webgl2"),this._gl||alert("Cannot use webgl2"),this.createWindow()}get gl(){return this._gl}makeVertexArray(t){const i=this._gl.createVertexArray();this._gl.bindVertexArray(i);for(const[r,e]of t)this._gl.bindBuffer(this._gl.ARRAY_BUFFER,r),this._gl.enableVertexAttribArray(e),this._gl.vertexAttribPointer(e,2,this._gl.FLOAT,!1,0,0);return i}makeTransformFeedback(t){const i=this._gl.createTransformFeedback();return this._gl.bindTransformFeedback(this._gl.TRANSFORM_FEEDBACK,i),this._gl.bindBufferBase(this._gl.TRANSFORM_FEEDBACK_BUFFER,0,t),i}makeBuffer(t,i=this._gl.STATIC_DRAW){const r=this._gl.createBuffer();return this._gl.bindBuffer(this._gl.ARRAY_BUFFER,r),this._gl.bufferData(this._gl.ARRAY_BUFFER,t,i),r}createWindow(){const t=this._gl;this.resizeCanvasToDisplaySize(t.canvas),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(1,1,1,1),t.enable(t.DEPTH_TEST),t.enable(t.CULL_FACE)}resizeCanvasToDisplaySize(t,i=1){const r=t.clientWidth*i|0,e=t.clientHeight*i|0;return t.width!==r||t.height!==e?(t.width=r,t.height=e,!0):!1}}const k=(s,t)=>(t===void 0&&(t=s,s=0),Math.random()*(t-s)+s),X=(s,t)=>new Array(s).fill(0).map(i=>t.map(r=>k(r[0],r[1]))).flat(),G=(s,t,i,r)=>{const e=Math.floor((s-i)/2),o=Math.floor((t-r)/2),a=[],c=[];for(let l=o;l<o+r;l++)for(let h=e;h<e+i;h++)a.push(h,l),c.push((h-(s-i)/2)/i,1-(l-(t-r)/2)/r);return{positions:a,texs:c}},W=(s,t,i,r,e,o)=>[2/(t-s),0,0,0,0,2/(r-i),0,0,0,0,2/(e-o),0,(s+t)/(s-t),(i+r)/(i-r),(e+o)/(e-o),1],Y=(s,t)=>{const i={...s};Object.assign(s,t),Object.assign(t,i)};class D{constructor(t,i,r,e){n(this,"_gl");n(this,"_program");this._gl=t,this._program=this.createProgram(i,r,e)}addAttrib(t){return this._gl.getAttribLocation(this._program,t)}addUniform(t){return this._gl.getUniformLocation(this._program,t)}use(){this._gl.useProgram(this._program)}createProgram(t,i,r){const e=this._gl.createProgram();e||console.error("failed to creat a program.");const o=this.createShader(this._gl.VERTEX_SHADER,t),a=this.createShader(this._gl.FRAGMENT_SHADER,i);return this._gl.attachShader(e,o),this._gl.attachShader(e,a),r&&this._gl.transformFeedbackVaryings(e,r,this._gl.SEPARATE_ATTRIBS),this._gl.linkProgram(e),this._gl.getProgramParameter(e,this._gl.LINK_STATUS)||(console.error(this._gl.getProgramInfoLog(e)),this._gl.deleteProgram(e)),e}createShader(t,i){const r=this._gl,e=r.createShader(t);if(e){if(r.shaderSource(e,i),r.compileShader(e),r.getShaderParameter(e,r.COMPILE_STATUS))return e;console.log(r.getShaderInfoLog(e)),r.deleteShader(e)}else console.error(`failed to creat a shader type ${t}.`)}}const z=`#version 300 es
  in vec2 oldPosition;
  in vec2 velocity;

  uniform vec2 canvasDimensions;
  uniform float deltaTime;
  uniform float isMove;

  out vec2 newPosition;

  vec2 euclideanModulo(vec2 n, vec2 m) {
  	return mod(mod(n, m) + m, m);
  }

  void main() {
    newPosition = euclideanModulo(
        oldPosition + velocity * deltaTime * isMove,
        canvasDimensions);
  }
  `,K=`#version 300 es
  precision highp float;
  void main() {
  }
  `;class H extends D{constructor(i){super(i,z,K,["newPosition"]);n(this,"_oldPosition");n(this,"_velocity");n(this,"_canvasDimensions");n(this,"_deltaTime");n(this,"_isMove");this._oldPosition=this.addAttrib("oldPosition"),this._velocity=this.addAttrib("velocity"),this._canvasDimensions=this.addUniform("canvasDimensions"),this._deltaTime=this.addUniform("deltaTime"),this._isMove=this.addUniform("isMove")}get oldPosition(){return this._oldPosition}get velocity(){return this._velocity}get canvasDimensions(){return this._canvasDimensions}get deltaTime(){return this._deltaTime}get isMove(){return this._isMove}}const j=`#version 300 es
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
  `,q=`#version 300 es
  precision highp float;

  in vec2 texCoord;
  out vec4 outColor;
  
  uniform sampler2D uImage;
  
  void main() {
    outColor = texture(uImage, texCoord);
  }
  `;class Z extends D{constructor(i){super(i,j,q);n(this,"_position");n(this,"_texPos");n(this,"_matrixUniform");this._position=this.addAttrib("pos"),this._texPos=this.addAttrib("tex"),this._matrixUniform=this.addUniform("matrix")}get position(){return this._position}get texPos(){return this._texPos}get matrixUniform(){return this._matrixUniform}}class ${constructor(t){n(this,"_gl");n(this,"_textureID");this._gl=t,this._textureID=t.createTexture()}initialise(t){this._gl.bindTexture(this._gl.TEXTURE_2D,this._textureID),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_S,this._gl.CLAMP_TO_EDGE),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_T,this._gl.CLAMP_TO_EDGE),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_MIN_FILTER,this._gl.LINEAR),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_MAG_FILTER,this._gl.LINEAR),this._gl.texImage2D(this._gl.TEXTURE_2D,0,this._gl.RGB,this._gl.RGB,this._gl.UNSIGNED_BYTE,t),this._gl.bindTexture(this._gl.TEXTURE_2D,null)}use(){this._gl.activeTexture(this._gl.TEXTURE0),this._gl.bindTexture(this._gl.TEXTURE_2D,this._textureID)}update(t){this.use(),this._gl.texImage2D(this._gl.TEXTURE_2D,0,this._gl.RGB,this._gl.RGB,this._gl.UNSIGNED_BYTE,t)}}const T=window.innerWidth,A=window.innerHeight,J=T*.8,S=A*.8,E=Math.min(J,Math.floor(S/8*6)),F=Math.min(S,Math.floor(E/6*8)),f=Math.floor(E*F),_=20;let b=0;var x;(x=document.getElementById("app"))==null||x.addEventListener("click",()=>{var s;b=1,(s=document.getElementById("click"))==null||s.setAttribute("hidden","true")});function Q(){const s=new O(T,A),t=s.gl,i=new $(t),r=new Image;r.src="img.jpg",r.onload=()=>{i.initialise(r)};const e=new H(t),o=new Z(t),a=G(T,A,E,F),c=new Float32Array(a.positions),l=new Float32Array(a.texs),h=new Float32Array(X(f,[[-_,_],[-_,_]])),g=s.makeBuffer(c,t.DYNAMIC_DRAW),u=s.makeBuffer(c,t.DYNAMIC_DRAW),v=s.makeBuffer(l,t.DYNAMIC_DRAW),R=s.makeBuffer(h,t.STATIC_DRAW),w=s.makeVertexArray([[g,e.oldPosition],[R,e.velocity]]),y=s.makeVertexArray([[u,e.oldPosition],[R,e.velocity]]),I=s.makeVertexArray([[g,o.position],[v,o.texPos]]),B=s.makeVertexArray([[u,o.position],[v,o.texPos]]),U=s.makeTransformFeedback(g),M=s.makeTransformFeedback(u);t.bindBuffer(t.ARRAY_BUFFER,null),t.bindBuffer(t.TRANSFORM_FEEDBACK_BUFFER,null);let d={updateVA:w,tf:M,drawVA:B},C={updateVA:y,tf:U,drawVA:I},P=0;function p(m){m*=.001;const V=m-P;P=m,t.clear(t.COLOR_BUFFER_BIT),e.use(),t.bindVertexArray(d.updateVA),t.uniform2f(e.canvasDimensions,t.canvas.width,t.canvas.height),t.uniform1f(e.deltaTime,V),t.uniform1f(e.isMove,b),t.enable(t.RASTERIZER_DISCARD),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,d.tf),t.beginTransformFeedback(t.POINTS),t.drawArrays(t.POINTS,0,f),t.endTransformFeedback(),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,null),t.disable(t.RASTERIZER_DISCARD),o.use(),i.use(),t.bindVertexArray(d.drawVA),t.viewport(0,0,t.canvas.width,t.canvas.height),t.uniformMatrix4fv(o.matrixUniform,!1,W(0,t.canvas.width,0,t.canvas.height,-1,1)),t.drawArrays(t.POINTS,0,f),Y(d,C),requestAnimationFrame(p)}requestAnimationFrame(p)}Q();
