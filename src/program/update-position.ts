import { Program } from "../lib/program";
import { updatePositionFS, updatePositionVS } from "../shader/update-position";

export class UpdatePosition extends Program {
  private _oldPosition: number;
  private _velocity: number;
  private _canvasDimensions: WebGLUniformLocation;
  private _deltaTime: WebGLUniformLocation;
  private _isMove: WebGLUniformLocation;

  constructor(gl: WebGL2RenderingContext) {
    super(gl, updatePositionVS, updatePositionFS, ["newPosition"]);

    this._oldPosition = this.addAttrib("oldPosition");
    this._velocity = this.addAttrib("velocity");
    this._canvasDimensions = this.addUniform("canvasDimensions");
    this._deltaTime = this.addUniform("deltaTime");
    this._isMove = this.addUniform("isMove");
  }
  get oldPosition() {
    return this._oldPosition;
  }
  get velocity() {
    return this._velocity;
  }
  get canvasDimensions() {
    return this._canvasDimensions;
  }
  get deltaTime() {
    return this._deltaTime;
  }
  get isMove() {
    return this._isMove;
  }
}
