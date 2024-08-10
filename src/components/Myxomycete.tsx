"use client";

import { useEffect, useRef } from "react";
import p5 from "p5";

export const Myxomycete = () => {
  // Reference to the HTML div element to render the p5 sketch
  const sketchRef = useRef<HTMLDivElement>(null);

  // useEffect hook to ensure the p5 sketch only runs in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Dynamically import the p5 library since it only works in the browser
      const p5 = require("p5");

      let molds: Eukaryote[] = [];
      const numberOfMolds = 1729; // The Hardy–Ramanujan Number, used as the total count of "molds"

      // The Eukaryote class, representing a single mold
      class Eukaryote {
        x: number;
        y: number;
        r: number;
        heading: number;
        vx: number;
        vy: number;
        rotAngle: number;
        stop: boolean;
        rSensorPos: p5.Vector;
        lSensorPos: p5.Vector;
        fSensorPos: p5.Vector;
        sensorAngle: number;
        sensorDist: number;

        // Eukaryote class constructor
        constructor(p: p5) {
          this.x = p.random(p.width); // Random x-coordinate within the canvas
          this.y = p.random(p.height); // Random y-coordinate within the canvas
          this.r = 0.5; // Radius of the mold
          this.heading = p.random(360); // Initial heading direction in degrees
          this.vx = p.cos(this.heading); // Velocity component in x-direction
          this.vy = p.sin(this.heading); // Velocity component in y-direction
          this.rotAngle = 45; // Rotation angle in degrees for turning
          this.stop = false; // Flag to stop the mold's movement
          this.rSensorPos = p.createVector(0, 0); // Right sensor position
          this.lSensorPos = p.createVector(0, 0); // Left sensor position
          this.fSensorPos = p.createVector(0, 0); // Front sensor position
          this.sensorAngle = 45; // Angle between the sensors
          this.sensorDist = 10; // Distance of sensors from the mold's center
        }

        // Method to update the mold's position and direction
        update(p: p5) {
          if (this.stop) {
            this.vx = 0; // Stop the mold's movement
            this.vy = 0;
          } else {
            this.vx = p.cos(this.heading); // Update velocity based on current heading
            this.vy = p.sin(this.heading);
          }

          // Update the mold's position, wrapping around the canvas edges
          this.x = (this.x + this.vx + p.width) % p.width;
          this.y = (this.y + this.vy + p.height) % p.height;

          // Update the sensor positions based on the current heading
          this.getSensorPos(
            this.rSensorPos,
            this.heading + this.sensorAngle,
            p,
          );
          this.getSensorPos(
            this.lSensorPos,
            this.heading - this.sensorAngle,
            p,
          );
          this.getSensorPos(this.fSensorPos, this.heading, p);

          // Determine the pixel color values at the sensor positions
          const d = p.pixelDensity();
          let index =
            4 * (d * p.floor(this.rSensorPos.y)) * (d * p.width) +
            4 * (d * p.floor(this.rSensorPos.x));
          let r = p.pixels[index];

          index =
            4 * (d * p.floor(this.lSensorPos.y)) * (d * p.width) +
            4 * (d * p.floor(this.lSensorPos.x));
          let l = p.pixels[index];

          index =
            4 * (d * p.floor(this.fSensorPos.y)) * (d * p.width) +
            4 * (d * p.floor(this.fSensorPos.x));
          let f = p.pixels[index];

          // Logic to adjust the heading based on sensor readings
          if (f > l && f > r) {
            this.heading += 0; // Move forward
          } else if (f < l && f < r) {
            if (p.random(1) < 0.5) {
              this.heading += this.rotAngle; // Randomly turn right
            } else {
              this.heading -= this.rotAngle; // Randomly turn left
            }
          } else if (l > r) {
            this.heading += -this.rotAngle; // Turn left
          } else if (r > l) {
            this.heading += this.rotAngle; // Turn right
          }
        }

        // Method to display the mold on the canvas
        display(p: p5) {
          p.noStroke(); // No outline for the mold
          p.fill(255); // Fill color (white)
          p.ellipse(this.x, this.y, this.r * 2, this.r * 2); // Draw the mold as a circle (NOTE: circle is a special case of ellipse)
        }

        // Method to calculate the position of a sensor based on angle and distance
        getSensorPos(sensor: p5.Vector, angle: number, p: p5) {
          sensor.x =
            (this.x + this.sensorDist * p.cos(angle) + p.width) % p.width;
          sensor.y =
            (this.y + this.sensorDist * p.sin(angle) + p.height) % p.height;
        }
      }

      // The p5 sketch
      const sketch = (p: p5) => {
        // Setup function to initialize the sketch
        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight); // Create a canvas covering the window
          p.angleMode(p.DEGREES); // Set angle mode to degrees
          for (let i = 0; i < numberOfMolds; i++) {
            molds[i] = new Eukaryote(p); // Create molds
          }
        };

        // Draw function to render the sketch continuously
        p.draw = () => {
          p.background(0, 5); // Background color with slight transparency for trails
          p.loadPixels(); // Load the pixel array for sensor checks

          for (let i = 0; i < numberOfMolds; i++) {
            molds[i].update(p); // Update each mold's position and heading
            molds[i].display(p); // Display each mold
          }
        };

        // Handle window resize events
        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight); // Resize canvas to fit the window
        };
      };

      // Create a new p5 instance and attach it to the sketchRef div
      const p5Instance = new p5(sketch, sketchRef.current!);

      // Cleanup function to remove the p5 instance when the component unmounts
      return () => {
        p5Instance.remove();
      };
    }
  }, []);

  // div element to hold the p5 sketch
  return <div ref={sketchRef} className="fade-in"></div>;
};
