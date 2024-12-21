import { useQuery } from '@apollo/client';
import { GET_FULL_MOON_PHASE_DATA } from 'query/moon-phase';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import moonTexture from '../../assets/moon-texture.jpg';
import moonDisplacement from '../../assets/moon-displacement.jpg';
import { useSearchParams } from 'react-router-dom';
import {
  HeaderInfo,
  HeaderWrapper,
  Moon,
  MoonPhaseInfoWrapper,
  Header,
  Info,
  Light,
} from './Moon-phase.styled';
import { Wrapper } from 'styles/Wrapper';
import { Navbar } from 'templates/Navbar';
import { Paragraph } from 'styles/Paragraph';
import { Loader } from 'templates/Loader';
import { useGSAPOnload } from 'hooks/use-gsap-onload';
import { useTitle } from 'hooks/use-title';

export const MoonPhase = () => {
  const country = useSearchParams()[0].get('country') ?? 'Ukraine';
  const variables = useMemo(
    () => ({
      location: { country, date: new Date() },
      data: {
        date: new Date(),
        country,
        distance: (
          localStorage.getItem('shown_distance') ?? 'KM'
        ).toUpperCase(),
      },
    }),
    [country]
  );
  const threeRef = useRef<HTMLDivElement>(null);
  const { loading, error, data } = useQuery(GET_FULL_MOON_PHASE_DATA, {
    variables,
  });

  useEffect(() => {
    if (loading || error || !data) return;

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
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); // Включаем анизотропию
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
  }, [loading, error, data]);

  useTitle(`phase — ${data?.getMoonPhase?.phase}${data?.getMoonPhase?.emoji}`);
  useGSAPOnload(
    [loading, data],
    { className: '.moon', delay: 0.5, duration: 0.4 },
    { className: '.current-phase', delay: 1, duration: 0.5 },
    { className: '.lunar-apsis', delay: 1.4, duration: 0.5 },
    {
      className: '.light',
      delay: 2,
      duration: 0.3,
      top: '50%',
      boxShadow: '0 0 270px 270px var(--border-color)',
    }
  );

  if (loading) return <Loader loading={loading} />;

  return (
    <Wrapper>
      {data && (
        <>
          <Navbar mappings={['/profile', '/home', '/events']} />
          <HeaderWrapper>
            <Moon className="moon" ref={threeRef}></Moon>
            <HeaderInfo>
              <Light className="light" />
              <Info className="current-phase">
                <Header>Current moon data:</Header>
                <MoonPhaseInfoWrapper>
                  <Paragraph>Phase: {data.getMoonPhase?.phase}</Paragraph>
                  <Paragraph>
                    Hemisphere: {data.getMoonPhase?.hemisphere}
                  </Paragraph>
                  <Paragraph>
                    Illumination: {data.getMoonPhase?.illumination}%
                  </Paragraph>
                  <Paragraph>
                    Declination: {data.getMoonPhase?.declination.toFixed(3)}°
                  </Paragraph>
                </MoonPhaseInfoWrapper>
              </Info>
              <Info className="lunar-apsis">
                <Header>About next lunar apsis:</Header>
                <MoonPhaseInfoWrapper>
                  <Paragraph>kind: {data.searchLunarApsis?.kind}</Paragraph>
                  <Paragraph>phase: {data.searchLunarApsis?.phase}</Paragraph>
                  <Paragraph>
                    date:{' '}
                    {new Date(data.searchLunarApsis?.time.date).toTimezone()}
                  </Paragraph>
                  <Paragraph>
                    distance: {data.searchLunarApsis?.distance.toFixed(1)}
                    {localStorage.getItem('shown_distance')}
                  </Paragraph>
                </MoonPhaseInfoWrapper>
              </Info>
            </HeaderInfo>
          </HeaderWrapper>
        </>
      )}
    </Wrapper>
  );
};
