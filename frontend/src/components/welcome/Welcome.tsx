import { useEffect, useLayoutEffect, useRef } from 'react';
import {
  Categories,
  Links,
  Starfield,
  TextWrapper,
  Wrapper,
} from './Welcome.styled';
import { Header } from 'styles/Header';
import { Paragraph } from 'styles/Paragraph';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { GithubIcon, InstagramIcon, TelegramIcon } from 'hugeicons-react';
import { Link } from 'styles/Link';
import { Button } from 'styles/Button';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm//postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export const Welcome = () => {
  const starfieldRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.to('.wrapper', {
      opacity: 1,
      duration: 0.5,
      delay: 3.5,
    });
  });

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    let index: number = 0;
    do {
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
      }, 2000);

      scene.add(star);
      index++;
    } while (index < 2000);

    camera.position.z = 50;

    renderer.setClearColor(new THREE.Color('#000'));
    renderer.setSize(window.innerWidth, window.innerHeight);
    starfieldRef.current?.appendChild(renderer.domElement);

    const mouse = { x: 0, y: 0, z: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 50 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 50 + 1;
    };

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.7,
      0.1,
      0.2
    );
    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    function needResize(renderer: THREE.WebGLRenderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;

      if (needResize) renderer.setSize(width, height, false);

      return needResize;
    }

    (function animate() {
      requestAnimationFrame(animate);

      if (needResize(renderer)) {
        camera.aspect = renderer.domElement.width / renderer.domElement.height;
        camera.updateProjectionMatrix();
      }
      scene.position.x = mouse.x * 0.1;
      scene.position.y = mouse.y * 0.1;

      composer.render();
    })();

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      starfieldRef.current?.removeChild(renderer.domElement);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useLayoutEffect(() => {
    if (localStorage.getItem('access_token')) navigate('/home');
  }, []);

  return (
    <Starfield ref={starfieldRef}>
      <Wrapper ref={wrapperRef} className="wrapper">
        <TextWrapper $place="flex-start">
          <Header>☾ Inspace</Header>
          <Paragraph>Let's spot events together.</Paragraph>
          <Links>
            <Link href={import.meta.env.VITE_GITHUB_URL} target="_blank">
              <GithubIcon size={32} />
            </Link>
            <Link href={import.meta.env.VITE_TELEGRAM_URL} target="_blank">
              <TelegramIcon size={32} />
            </Link>
            <Link href={import.meta.env.VITE_INSTAGRAM_URL} target="_blank">
              <InstagramIcon size={32} />
            </Link>
          </Links>
        </TextWrapper>
        <TextWrapper $place="flex-start">
          <Paragraph>
            With <b>☾ Inspace</b> you can spot more things, like:
          </Paragraph>
          <Categories>
            <Paragraph $weight={500}>&#183; Moon phase</Paragraph>
            <Paragraph $weight={500}>&#183; Solar & Lunar eclipse</Paragraph>
            <Paragraph $weight={500}>&#183; Air & Light pollution</Paragraph>
            <Paragraph $weight={500}>&#183; And other events</Paragraph>
          </Categories>
          <Button $marginTop="auto" onClick={() => navigate('/login')}>
            let's started
          </Button>
        </TextWrapper>
      </Wrapper>
    </Starfield>
  );
};
