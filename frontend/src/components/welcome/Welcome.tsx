import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm//postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export const Welcome = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    for (let i = 0; i < 2000; i++) {
      const star = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 32, 32, 32),
        new THREE.MeshBasicMaterial({
          color: '#fff',
        })
      );

      star.position.set(0, 0, -350);

      setTimeout(() => {
        star.position.set(
          (Math.random() - 0.5) * 350,
          (Math.random() - 0.5) * 350,
          (Math.random() - 0.5) * 350
        );
      }, 3000);

      scene.add(star);
    }

    camera.position.z = 50;

    renderer.setClearColor(new THREE.Color('#000'));
    renderer.setSize(window.innerWidth, window.innerHeight);
    wrapperRef.current?.appendChild(renderer.domElement);

    const mouse = { x: 0, y: 0, z: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 50 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 50 + 1;
    };

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.7,
      0.1,
      0.2
    );
    composer.addPass(bloomPass);

    function animate() {
      requestAnimationFrame(animate);

      scene.position.x = mouse.x * 0.1;
      scene.position.y = mouse.y * 0.1;

      composer.render();
    }

    animate();

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      wrapperRef.current?.removeChild(renderer.domElement);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ width: '100vw', height: '100vh' }}></div>
  );
};
