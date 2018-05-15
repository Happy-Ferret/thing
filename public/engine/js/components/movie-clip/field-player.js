import call from "../../utils/call.js";

export default class FieldPlayer {
	
	init(target, data, pow, damper) {
		
		this.target = target;
		this.fieldName = data.n;
		this.timeline = data.t;
		this.pow = pow;
		this.damper = damper;
		this.reset();
	}
	
	reset() {
		this.time = 0;
		this.currentFrame = this.timeline[0];
		this.val = this.currentFrame.v;
		this.targetVal = this.val;
		this.currentTime = 0;
		this.speed = 0;
		this.target[this.fieldName] = this.val;
	}
	
	goto(time, nextKeyframe) {
		this.currentFrame = nextKeyframe;
		this.time = time;
	}
	
	update() {
		var currentFrame = this.currentFrame;
		if (this.time === currentFrame.t) {

			if (currentFrame.hasOwnProperty('a')) {
//EDITOR
				if(!this.__dontCallActions) {
					console.log('timeline CALL: ' + this.target.name + '; ' + currentFrame.t + '; ' + currentFrame.a);
//ENDEDITOR
					call(currentFrame.a, this.target);
//EDITOR
				}
//ENDEDITOR
			}
			
			if(currentFrame.hasOwnProperty('s')) {
				this.speed = currentFrame.s;
			}
			
			if (currentFrame.m !== 0) { //discrete and linear Mode fields apply exact value
				this.val = currentFrame.v;
			}
			
			this.time = currentFrame.j;
			this.currentFrame = currentFrame = currentFrame.n;
			if(currentFrame.m === 1) {// linear Mode
				var dist = currentFrame.t - this.time;
				if(dist > 0) {
					this.speed = (currentFrame.v - this.val) / dist;
				}
			} else if(currentFrame.m === 2) {// discrete Mode
				this.speed = 0;
			}
		}

		if (currentFrame.m === 0) { //- SMOOTH
			this.speed += (currentFrame.v - this.val) * this.pow;
			this.speed *= this.damper;
			this.val += this.speed;
		} else if(currentFrame.m === 1) { //LINEAR
			this.val += this.speed;
		} else if(currentFrame.m === 3) { //JUMP FLOOR
			this.speed += currentFrame.g;
			if(this.val >= currentFrame.v) {
				this.val = currentFrame.v;
				this.speed *= currentFrame.b;
			} else {
				this.val += this.speed;
			}
		} else if(currentFrame.m === 3) { //JUMP ROOF
			this.speed -= currentFrame.g;
			if(this.val <= currentFrame.v) {
				this.val = currentFrame.v;
				this.speed *= currentFrame.b;
			} else {
				this.val += this.speed;
			}
		}

		this.target[this.fieldName] = this.val;
		this.time++;
	}
	
	//EDITOR
	__getValueForPreview(time) {
		this.reset();
		while (time > 0) {
			this.update();
			time--;
		}
		return this.val;
	}
	
	__serializeTimeline() {
		var keyframes = [];
		return {
			
		}
	}
	
	//ENDEDITOR
}
