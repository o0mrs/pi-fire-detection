import cv from '@u4/opencv4nodejs';
import { resolve } from 'path';
import fs from 'fs';
import PiCamera from 'pi-camera';
const lowerColor = new cv.Vec(18, 50, 50);
const upperColor = new cv.Vec(35, 255, 255);
const myCamera = new PiCamera({
    mode: 'photo',
    width: 640,
    height: 480,
    nopreview: true,
  });
var count = 0;
const detectFace = async()=>{

// detect.writeSync(0)
  myCamera.snap()
  .then( async (result) => {
    const file = resolve('/home/lukes/fire4/a.jpg');
    console.log('loading ', file);
    const image = cv.imread(file);
    console.log('Image loaded');

  const hsvImage = image.cvtColor(cv.COLOR_BGR2HSV);

   const lower = new cv.Vec(0, 70, 50);
  const upper = new cv.Vec(10, 255, 255);

  const thresholdImage = hsvImage.inRange(lower, upper);

  const nonZeroCount = cv.countNonZero(thresholdImage);

  if (nonZeroCount > 0) {
    console.log("Fire detected in the image.");
    detectFace()
  } else {
    console.log("No fire detected in the image.");
    detectFace()
  }
  })
  .catch((error) => {
     console.log(error)
  });

}
const runme = async()=>{
   detectFace()
}
runme()
export async function detectFire() {

}
detectFire();
