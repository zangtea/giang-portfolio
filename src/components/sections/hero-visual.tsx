"use client";

import { useEffect, useRef } from "react";
import {
  AmbientLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  TorusKnotGeometry,
  WebGLRenderer,
} from "three";

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
      });
    } catch {
      return;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 5.2;
    scene.add(new AmbientLight(0xffffff, 1.8));

    const sculpture = new Group();
    const shell = new Mesh(
      new SphereGeometry(1.35, 28, 20),
      new MeshBasicMaterial({ color: 0xe94e35, wireframe: true, transparent: true, opacity: 0.78 })
    );
    const orbit = new Mesh(
      new TorusKnotGeometry(0.7, 0.018, 120, 8, 2, 5),
      new MeshBasicMaterial({ color: 0x167c80, wireframe: true, transparent: true, opacity: 0.9 })
    );
    sculpture.add(shell, orbit);
    scene.add(sculpture);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "absolute inset-0 h-full w-full";
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    });
    resizeObserver.observe(container);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const handlePointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.5;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.5;
    };
    const animate = () => {
      sculpture.rotation.y += (pointerX - sculpture.rotation.y) * 0.025 + 0.001;
      sculpture.rotation.x += (-pointerY - sculpture.rotation.x) * 0.025;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    container.addEventListener("pointermove", handlePointerMove);
    if (reduceMotion) renderer.render(scene, camera);
    else frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      shell.geometry.dispose();
      shell.material.dispose();
      orbit.geometry.dispose();
      orbit.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}