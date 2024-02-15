import { Program } from "../lib/program";
import { drawParticlesFS, drawParticlesVS } from "../shader/draw-particles";

export class DrawParticles extends Program {
  private _position: number;
  private _texPos: number;
  private _matrixUniform: WebGLUniformLocation;

  constructor(gl: WebGL2RenderingContext) {
    super(gl, drawParticlesVS, drawParticlesFS);

    this._position = this.addAttrib("pos");
    this._texPos = this.addAttrib("tex");
    this._matrixUniform = this.addUniform("matrix");
  }
  get position() {
    return this._position;
  }
  get texPos() {
    return this._texPos;
  }
  get matrixUniform() {
    return this._matrixUniform;
  }
}
