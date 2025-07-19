import { type RefObject } from 'react';
import * as THREE from 'three';
import moonTexture from '../../assets/moon-texture.jpg';
import moonDisplacement from '../../assets/moon-displacement.jpg';

export const renderMoon = (threeRef: RefObject<HTMLDivElement>, data: any) => {
  if (threeRef.current && data.getMoonPhase?.hemisphere === 'Southern')
    threeRef.current.style.rotate = '180deg';

  const textureLoader = new THREE.TextureLoader();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1.5,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  camera.position.z = 2.53;

  renderer.setClearColor(new THREE.Color('#000'));
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeRef.current?.appendChild(renderer.domElement);

  const moonTextureHighRes = textureLoader.load(moonTexture, texture => {
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  });
  const moonDisplacementHighRes = textureLoader.load(
    moonDisplacement,
    texture => {
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    }
  );

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64, 64),
    new THREE.MeshPhongMaterial({
      color: 'white',
      map: moonTextureHighRes,
      displacementMap: moonDisplacementHighRes,
      displacementScale: 0.05,
      bumpMap: moonDisplacementHighRes,
      bumpScale: 0.4,
      reflectivity: 0.2,
      shininess: 10,
    })
  );

  moon.rotation.y = 179.6;

  const darkLight = new THREE.PointLight('#222222', 50);
  darkLight.position.set(0, 0, 5);
  const light = new THREE.PointLight('#d1d1d1', 50);
  light.position.copy(
    new THREE.Vector3(
      data.getMoonPhase?.x,
      data.getMoonPhase?.y,
      data.getMoonPhase?.z
    )
  );
  scene.add(moon);
  scene.add(light, darkLight);

  function needResize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function animate() {
    requestAnimationFrame(animate);

    if (needResize(renderer)) {
      camera.aspect =
        renderer.domElement.clientWidth / renderer.domElement.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
  }

  animate();

  return () => {
    threeRef.current?.removeChild(renderer.domElement);
    renderer.dispose();
  };
};
