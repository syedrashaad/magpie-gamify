import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BodyColor, Accessory } from '../types';

interface Magpie3DCanvasProps {
  bodyColor?: BodyColor;
  accessory?: Accessory;
  level?: number;
  isFlying?: boolean;
  isCelebrating?: boolean;
  className?: string;
}

export const Magpie3DCanvas: React.FC<Magpie3DCanvasProps> = ({
  bodyColor = 'blue',
  accessory = 'headphones',
  level = 2,
  isFlying = false,
  isCelebrating = false,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Color resolution
    let mainColorHex = 0x1E3A8A;
    let wingColorHex = 0x1D4ED8;
    let accentHex = 0x38BDF8;

    if (bodyColor === 'black') {
      mainColorHex = 0x0F172A;
      wingColorHex = 0x334155;
      accentHex = 0x38BDF8;
    } else if (bodyColor === 'purple') {
      mainColorHex = 0x4C1D95;
      wingColorHex = 0x7C3AED;
      accentHex = 0xC084FC;
    } else if (bodyColor === 'green') {
      mainColorHex = 0x064E3B;
      wingColorHex = 0x059669;
      accentHex = 0x34D399;
    } else if (bodyColor === 'gold') {
      mainColorHex = 0x78350F;
      wingColorHex = 0xD97706;
      accentHex = 0xFBBF24;
    }

    // Root Group
    const magpieGroup = new THREE.Group();
    scene.add(magpieGroup);

    // Scaling based on level
    const levelScale = 1 + (level - 1) * 0.15;
    magpieGroup.scale.set(levelScale, levelScale, levelScale);

    // 1. Body Mesh
    const bodyGeo = new THREE.SphereGeometry(1.2, 32, 32);
    bodyGeo.scale(1, 1.25, 0.95);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: mainColorHex,
      roughness: 0.35,
      metalness: 0.45,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.castShadow = true;
    magpieGroup.add(bodyMesh);

    // 2. Chest Patch
    const chestGeo = new THREE.SphereGeometry(0.9, 32, 32);
    chestGeo.scale(0.85, 1.05, 0.4);
    const chestMat = new THREE.MeshStandardMaterial({
      color: 0xFAF8F5,
      roughness: 0.7,
    });
    const chestMesh = new THREE.Mesh(chestGeo, chestMat);
    chestMesh.position.set(0, -0.1, 0.7);
    magpieGroup.add(chestMesh);

    // 3. Head & Beak Group
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.1, 0.2);
    magpieGroup.add(headGroup);

    const headGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const headMesh = new THREE.Mesh(headGeo, bodyMat);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Beak
    const beakGeo = new THREE.ConeGeometry(0.32, 1.1, 32);
    beakGeo.rotateX(Math.PI / 2);
    const beakMat = new THREE.MeshStandardMaterial({
      color: 0xD97706,
      metalness: 0.6,
      roughness: 0.2,
    });
    const beakMesh = new THREE.Mesh(beakGeo, beakMat);
    beakMesh.position.set(0, -0.1, 0.95);
    headGroup.add(beakMesh);

    // Eyes (Left and Right)
    const eyeGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.1 });
    const shineMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(0.48, 0.25, 0.55);
    headGroup.add(leftEye);

    const leftShine = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), shineMat);
    leftShine.position.set(0.53, 0.3, 0.66);
    headGroup.add(leftShine);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(-0.48, 0.25, 0.55);
    headGroup.add(rightEye);

    const rightShine = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), shineMat);
    rightShine.position.set(-0.43, 0.3, 0.66);
    headGroup.add(rightShine);

    // 4. Wings (Left & Right)
    const wingGeo = new THREE.ConeGeometry(0.7, 2.2, 32);
    wingGeo.scale(1, 1, 0.25);
    const wingMat = new THREE.MeshStandardMaterial({
      color: wingColorHex,
      roughness: 0.3,
      metalness: 0.5,
    });

    const leftWingGroup = new THREE.Group();
    leftWingGroup.position.set(1.2, 0.1, 0);
    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.rotation.z = -Math.PI / 4;
    leftWing.position.set(0.4, -0.4, 0);
    leftWingGroup.add(leftWing);
    magpieGroup.add(leftWingGroup);

    const rightWingGroup = new THREE.Group();
    rightWingGroup.position.set(-1.2, 0.1, 0);
    const rightWing = new THREE.Mesh(wingGeo, wingMat);
    rightWing.rotation.z = Math.PI / 4;
    rightWing.position.set(-0.4, -0.4, 0);
    rightWingGroup.add(rightWing);
    magpieGroup.add(rightWingGroup);

    // 5. Tail Feathers
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, -0.9, -0.8);
    const tailGeo = new THREE.BoxGeometry(0.4, 1.8, 0.08);
    const tailMat = new THREE.MeshStandardMaterial({ color: accentHex, roughness: 0.3 });
    const tailMesh = new THREE.Mesh(tailGeo, tailMat);
    tailMesh.rotation.x = Math.PI / 6;
    tailGroup.add(tailMesh);
    magpieGroup.add(tailGroup);

    // 6. Accessories
    if (accessory === 'headphones') {
      const bandGeo = new THREE.TorusGeometry(0.9, 0.08, 16, 32, Math.PI);
      const bandMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.3 });
      const bandMesh = new THREE.Mesh(bandGeo, bandMat);
      bandMesh.rotation.x = -Math.PI / 8;
      bandMesh.position.set(0, 0.3, 0);
      headGroup.add(bandMesh);

      const cupGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 16);
      cupGeo.rotateZ(Math.PI / 2);
      const cupMat = new THREE.MeshStandardMaterial({ color: 0x6D28D9, metalness: 0.7 });

      const leftCup = new THREE.Mesh(cupGeo, cupMat);
      leftCup.position.set(0.85, 0.2, 0);
      headGroup.add(leftCup);

      const rightCup = new THREE.Mesh(cupGeo, cupMat);
      rightCup.position.set(-0.85, 0.2, 0);
      headGroup.add(rightCup);
    } else if (accessory === 'cap') {
      const capGeo = new THREE.SphereGeometry(0.88, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.2);
      const capMat = new THREE.MeshStandardMaterial({ color: 0x6D28D9 });
      const capMesh = new THREE.Mesh(capGeo, capMat);
      capMesh.position.set(0, 0.1, 0);
      headGroup.add(capMesh);

      const visorGeo = new THREE.BoxGeometry(0.8, 0.05, 0.6);
      const visorMat = new THREE.MeshStandardMaterial({ color: 0x4C1D95 });
      const visorMesh = new THREE.Mesh(visorGeo, visorMat);
      visorMesh.position.set(0, 0.3, 0.85);
      visorMesh.rotation.x = Math.PI / 12;
      headGroup.add(visorMesh);
    } else if (accessory === 'glasses') {
      const frameMat = new THREE.MeshStandardMaterial({ color: 0xD97706, metalness: 0.8 });
      const leftRing = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.04, 16, 32), frameMat);
      leftRing.position.set(0.48, 0.25, 0.75);
      headGroup.add(leftRing);

      const rightRing = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.04, 16, 32), frameMat);
      rightRing.position.set(-0.48, 0.25, 0.75);
      headGroup.add(rightRing);

      const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8), frameMat);
      bridge.rotation.z = Math.PI / 2;
      bridge.position.set(0, 0.25, 0.75);
      headGroup.add(bridge);
    }

    // 7. Ambient Floating Particles
    const particlesCount = 40;
    const particlesGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 8;
      posArray[i + 1] = (Math.random() - 0.5) * 8;
      posArray[i + 2] = (Math.random() - 0.5) * 6;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.08,
      color: accentHex,
      transparent: true,
      opacity: 0.6,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 1.8);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const purpleRimLight = new THREE.PointLight(0x7C3AED, 2.5, 10);
    purpleRimLight.position.set(-4, 2, -2);
    scene.add(purpleRimLight);

    const goldRimLight = new THREE.PointLight(0xF59E0B, 2.0, 10);
    goldRimLight.position.set(4, -2, 2);
    scene.add(goldRimLight);

    // Mouse Move Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 1.5;
      mouseY = y * 1.2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle bobbing & rotation
      if (isFlying) {
        magpieGroup.position.y = Math.sin(elapsedTime * 6) * 0.25;
        magpieGroup.rotation.z = Math.sin(elapsedTime * 4) * 0.1;
        leftWingGroup.rotation.z = Math.sin(elapsedTime * 15) * 0.6;
        rightWingGroup.rotation.z = -Math.sin(elapsedTime * 15) * 0.6;
      } else if (isCelebrating) {
        magpieGroup.position.y = Math.abs(Math.sin(elapsedTime * 8)) * 0.8;
        magpieGroup.rotation.y += 0.04;
        leftWingGroup.rotation.z = Math.sin(elapsedTime * 20) * 0.8;
        rightWingGroup.rotation.z = -Math.sin(elapsedTime * 20) * 0.8;
      } else {
        // Idle state
        magpieGroup.position.y = Math.sin(elapsedTime * 2) * 0.12;
        leftWingGroup.rotation.z = Math.sin(elapsedTime * 2.5) * 0.08;
        rightWingGroup.rotation.z = -Math.sin(elapsedTime * 2.5) * 0.08;

        // Smooth mouse look at
        headGroup.rotation.y += (mouseX - headGroup.rotation.y) * 0.08;
        headGroup.rotation.x += (-mouseY - headGroup.rotation.x) * 0.08;
        magpieGroup.rotation.y += (mouseX * 0.5 - magpieGroup.rotation.y) * 0.05;
      }

      // Rotate particles
      particlesMesh.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [bodyColor, accessory, level, isFlying, isCelebrating]);

  return (
    <div className={`relative w-full h-full min-h-[300px] flex items-center justify-center ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
