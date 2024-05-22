<template>
  <canvas id="map"></canvas>
</template>

<script>
/* Work in progress. Thanks to https://codepen.io/Mamboleoo/pen/JYJPJr */
import { gsap } from "gsap";
import * as THREE from 'three';

export default {
  name: "ThreeMap",
  props: {},
  data() {
    return {
      threeRef: ""
    };
  },

  mounted() {
    this.setup();
  },

  beforeDestroy() {
    this.hide();
    this.killThree();
  },

  methods: {
    setup() {
      var renderer, scene, camera, ww, wh, particles, texture, imagedata;

      renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("map"),
        antialias: true,
        alpha: true
      });
      renderer.setClearColor(0x011627); //HERE

      (ww = window.innerWidth), (wh = window.innerHeight);

      var centerVector = new THREE.Vector3(0, 0, 0);
      var previousTime = 0;

      var getImageData = function (image) {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        return ctx.getImageData(0, 0, image.width, image.height);
      };

      var drawTheMap = function () {
        var geometry = new THREE.Geometry();
        var material = new THREE.PointsMaterial({
          size: 3,
          color: 0x654af8,
          sizeAttenuation: false,
        });
        for (var y = 0, y2 = imagedata.height; y < y2; y += 2) {
          for (var x = 0, x2 = imagedata.width; x < x2; x += 2) {
            if (imagedata.data[x * 4 + y * 4 * imagedata.width + 3] > 128) {
              var vertex = new THREE.Vector3();
              vertex.x = Math.random() * 1000 - 500;
              vertex.y = Math.random() * 1000 - 500;
              vertex.z = -Math.random() * 500;

              vertex.destination = {
                x: x - imagedata.width / 2,
                y: -y + imagedata.height / 2,
                z: 0,
              };

              vertex.speed = Math.random() / 200 + 0.015;

              geometry.vertices.push(vertex);
            }
          }
        }
        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        requestAnimationFrame(render);
      };

      var init = function () {
        THREE.ImageUtils.crossOrigin = "";

        renderer.setSize(ww, wh);
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(50, ww / wh, 0.1, 10000);
        camera.position.set(-100, 0, 220);
        camera.lookAt(centerVector);
        scene.add(camera);

        texture = THREE.ImageUtils.loadTexture(
          "https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/transparentMap.png",
          undefined,
          function () {
            imagedata = getImageData(texture.image);
            drawTheMap();
          }
        );
        window.addEventListener("resize", onResize, false);
      };

      var onResize = function () {
        ww = window.innerWidth;
        wh = window.innerHeight;
        renderer.setSize(ww, wh);
        camera.aspect = ww / wh;
        camera.updateProjectionMatrix();
      };

      var render = function (a) {
        requestAnimationFrame(render);

        for (var i = 0, j = particles.geometry.vertices.length; i < j; i++) {
          var particle = particles.geometry.vertices[i];
          particle.x += (particle.destination.x - particle.x) * particle.speed;
          particle.y += (particle.destination.y - particle.y) * particle.speed;
          particle.z += (particle.destination.z - particle.z) * particle.speed;
        }

        if (a - previousTime > 100) {
          var index = Math.floor(
            Math.random() * particles.geometry.vertices.length
          );
          var particle1 = particles.geometry.vertices[index];
          var particle2 =
            particles.geometry.vertices[
            particles.geometry.vertices.length - index
            ];

          if (particle2.x) {
            gsap.to(particle, {
              duration: Math.random() * 2 + 1,
              x: particle2.x,
              y: particle2.y,
              ease: "power1.inOut",
            });
          }

          gsap.to(particle2, {
            duration: Math.random() * 2 + 1,
            x: particle1.x,
            y: particle1.y,
            ease: "power1.inOut",
          });

          previousTime = a;
        }

        particles.geometry.verticesNeedUpdate = true;
        camera.position.x = Math.sin(a / 5000) * 100;
        camera.lookAt(centerVector);

        renderer.render(scene, camera);
      };

      this.threeRef = renderer;

      init();
    },

    killThree() {
      this.threeRef.dispose();
      this.threeRef.forceContextLoss();
    },

    hide() {
      document.querySelector("#map").style = "opacity:0";
    }

  },
};
</script>

<style scoped>
body,
html,
canvas {
  opacity: 1;
  background-color: #011627;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  z-index: -1;
  top: 0;
  left: 0;
}

.off-leave-active {
  opacity: 1;
}
</style>
