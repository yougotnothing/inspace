import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Welcome = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const starColors = ['#fff', '#ebb2fd', '#ac6cd6', '#adfff1', '#9678e7'];
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    const renderer = new THREE.WebGLRenderer();

    camera.position.z = 200;

    renderer.setClearColor(new THREE.Color('#000'));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    wrapperRef.current?.appendChild(renderer.domElement);

    const starGeometry = new THREE.SphereGeometry(1, 32, 32);

    const createStar = (color: string, position: THREE.Vector3) => {
      const starMaterial = new THREE.MeshBasicMaterial({ color });
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.copy(position);
      star.castShadow = true;
      star.receiveShadow = true;

      const glowMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.3,
      });
      const glow = new THREE.Mesh(starGeometry, glowMaterial);
      glow.scale.set(2, 2, 2);
      glow.position.copy(position);
      glow.castShadow = false;
      glow.receiveShadow = false;

      scene.add(glow, star);
    };

    for (let i = 0; i < 1500; i++) {
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
      createStar(color, position);
    }

    const light = new THREE.DirectionalLight('#fff', 1);
    light.position.set(0, 0, 1).normalize();
    scene.add(light);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      scene.rotation.x = mouse.y * 0.1; // Rotation based on mouse movement
      scene.rotation.y = mouse.x * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      wrapperRef.current?.removeChild(renderer.domElement);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <div ref={wrapperRef}></div>;
};
