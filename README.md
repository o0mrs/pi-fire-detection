# detect-fire-in-raspberrypi
This program detects fire in a Raspberry Pi using Node.js and OpenCV. To get started, you must ensure that OpenCV is built. Check the instructions in this repo https://github.com/UrielCh/opencv4nodejs#readme If you need any help, you can reach out at Discord (omrs) or open an issue in the repository.
this code was tested in pi4 with node v18.13.0 cpu usage (4-25) av 12
# instructions  
after building it and running it won't work you must change the pi-camera lib 
go to "/node_modules/pi-camera/index.js"
change the snap() function to
```
 snap() {
    if (this.mode !== 'photo') {
      throw new Error(`snap() can only be called when Pi-Camera is in 'photo' mode`);
    }
    
    return Execute.run(Execute.cmd('raspistill --timeout 2 -o /home/omar/fire4/a.jpg', this.configToArray()));
  }

```
where /home/omar/fire4/a.jpg is where you want to save the photo and --timeout 2 is max time it needs 
after that go to index.js file (the code file) and change
```
const file = resolve('/home/omar/fire4/a.jpg'); 
```
to the place you are saving your pic
NOTE:you must keep thee same name (a.jpg)
and it should work
# How it works
The algorithm uses the following steps to detect fire in an image:

- Load the image: The first step is to load the image into the algorithm using the cv.imread function from the OpenCV4Nodejs library.

- Convert to the HSV color space: The algorithm then converts the loaded image from the BGR color space to the HSV (Hue, Saturation, Value) color space. The HSV color space is a cylindrical color model that separates color information from brightness information. In this color space, the hue represents the actual color, the saturation represents the intensity of the color, and the value represents the brightness of the color. By converting the image to the HSV color space, the algorithm can more easily detect the presence of fire based on the hue of the pixels in the image.

- Define the color range for fire: The algorithm then defines the range of colors that represent fire in the HSV color space. The color range is defined as a lower and upper bound using the cv.Vec function. Fire is typically represented by a red hue in the HSV color space, so the lower and upper bounds are chosen to capture the range of hues that represent red. The exact values for the lower and upper bounds may vary depending on the lighting conditions and the type of fire being detected.

- Threshold the image: The algorithm then uses the hsvImage.inRange function to threshold the image and only select pixels that are within the defined range of colors. The resulting image only contains pixels that are likely to represent fire based on the hue of the pixels.

- Count non-zero pixels: The algorithm then uses the cv.countNonZero function to count the number of non-zero pixels in the threshold image. The number of non-zero pixels gives an estimate of the amount of fire present in the image.

- Determine the presence of fire: The algorithm finally uses the number of non-zero pixels to determine if there is fire in the image. If the number of non-zero pixels is greater than zero, the algorithm outputs "Fire detected in the image." If the number of non-zero pixels is zero, the algorithm outputs "No fire detected in the image."

This is a basic example of how the algorithm works. The accuracy of the fire detection can be improved by fine-tuning the color range, using more advanced image processing techniques, and incorporating additional information such as smoke or heat.

# TODO
- detect the size of the fire
- detect if there are people in it
- obtain the location using GPS.
