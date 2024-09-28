import { useQuery } from '@apollo/client';
import { GET_MOON_PHASE } from 'query/moon-phase';
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
  const { loading, error, data } = useQuery(GET_MOON_PHASE, { variables });

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
      new THREE.MeshPhongMaterial({
        color: 'white',
        map: new THREE.TextureLoader().load(moonTexture),
      })
    );

    moon.rotation.y = 179.6;

    const light = new THREE.PointLight('#ffffff', 50);
    light.position.copy(
      new THREE.Vector3(
        data.getMoonPhase?.x,
        THREE.MathUtils.degToRad(data.getMoonPhase?.declination),
        data.getMoonPhase?.z
      )
    );
    scene.add(moon);
    scene.add(light);

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
  }, [loading, error, data]);

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return <div ref={threeRef} style={{ width: '100vw', height: '100vh' }}></div>;
};
