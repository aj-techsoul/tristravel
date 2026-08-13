'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Canvas3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear container before append
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Create 3D floating particle clouds & geometric crystals
    const particlesCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const emeraldColor = new THREE.Color('#20c997');
    const goldColor = new THREE.Color('#e5a93b');
    const mistColor = new THREE.Color('#a3b8b0');

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 35;
      positions[i + 1] = (Math.random() - 0.5) * 35;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      const rand = Math.random();
      const mixedColor = rand > 0.6 ? emeraldColor : rand > 0.3 ? mistColor : goldColor;
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Add floating 3D organic crystal mesh
    const polyGeometry = new THREE.IcosahedronGeometry(2, 0);
    const polyMaterial = new THREE.MeshPhongMaterial({
      color: 0x0f5132,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const polyMesh = new THREE.Mesh(polyGeometry, polyMaterial);
    polyMesh.position.set(6, 2, -2);
    scene.add(polyMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x20c997, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x += 0.0005;

      polyMesh.rotation.x += 0.005;
      polyMesh.rotation.y += 0.008;

      // Mouse interactive tilt
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
