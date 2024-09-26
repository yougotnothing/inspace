import { useQuery } from '@apollo/client';
import { GET_MOON_PHASE } from '../../apollo/queries/moon-phase.query';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import moonTexture from '../../assets/moon-texture.jpg';

export const MoonPhase = () => {
  const variables = useMemo(
    () => ({
      location: {
        country: 'Poland',
        date: new Date(),
      },
    }),
    []
  );
  const threeRef = useRef<HTMLDivElement>(null);
  const { loading, error, data } = useQuery(GET_MOON_PHASE, {
    variables,
  });

  useEffect(() => {
    if (loading || error || !data) return;

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

    camera.position.z = 3;

    renderer.setClearColor(new THREE.Color('#000'));
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeRef.current?.appendChild(renderer.domElement);

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64, 64),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(moonTexture),
      })
    );

    moon.rotateY(180);
    moon.rotateX(data?.declination ?? 0);

    scene.add(moon);

    function animate() {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      threeRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [loading, error, data]);

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return <div ref={threeRef} style={{ width: '100vw', height: '100vh' }}></div>;
};
