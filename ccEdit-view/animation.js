import { AnimationClip, VectorKeyframeTrack, AnimationMixer } from "three";

const times = [0, 3];
const values = [0.5, 1.5];

const positionKF = new VectorKeyframeTrack(".scale", times, values);

// just one track for now
const tracks = [positionKF];

// use -1 to automatically calculate
// the length from the array of tracks
const length = -1;

const clip = new AnimationClip("slowmove", length, tracks);
