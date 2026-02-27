"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 v_uv;
  void main() {
    v_uv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform sampler2D u_texture;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_radius;
  uniform float u_speed;
  uniform float u_imageAspect;
  uniform float u_turbulenceIntensity;

  varying vec2 v_uv;

  vec3 hash33(vec3 p) {
    p = fract(p * vec3(443.8975, 397.2973, 491.1871));
    p += dot(p.zxy, p.yxz + 19.27);
    return fract(vec3(p.x * p.y, p.z * p.x, p.y * p.z));
  }

  float simplex_noise(vec3 p) {
    const float K1 = 0.333333333;
    const float K2 = 0.166666667;
    vec3 i = floor(p + (p.x + p.y + p.z) * K1);
    vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
    vec3 e = step(vec3(0.0), d0 - d0.yzx);
    vec3 i1 = e * (1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy * (1.0 - e);
    vec3 d1 = d0 - (i1 - K2);
    vec3 d2 = d0 - (i2 - K2 * 2.0);
    vec3 d3 = d0 - (1.0 - 3.0 * K2);
    vec4 h = max(0.6 - vec4(dot(d0,d0), dot(d1,d1), dot(d2,d2), dot(d3,d3)), 0.0);
    vec4 n = h * h * h * h * vec4(
      dot(d0, hash33(i)*2.0-1.0),
      dot(d1, hash33(i+i1)*2.0-1.0),
      dot(d2, hash33(i+i2)*2.0-1.0),
      dot(d3, hash33(i+1.0)*2.0-1.0)
    );
    return 0.5 + 0.5 * 31.0 * dot(n, vec4(1.0));
  }

  vec2 curl(vec2 p, float time) {
    const float epsilon = 0.001;
    float n1 = simplex_noise(vec3(p.x, p.y + epsilon, time));
    float n2 = simplex_noise(vec3(p.x, p.y - epsilon, time));
    float n3 = simplex_noise(vec3(p.x + epsilon, p.y, time));
    float n4 = simplex_noise(vec3(p.x - epsilon, p.y, time));
    return vec2((n2-n1)/(2.0*epsilon), (n4-n3)/(2.0*epsilon));
  }

  float inkMarbling(vec2 p, float time, float intensity) {
    float result = 0.0;
    vec2 flow = curl(p*1.5, time*0.1) * intensity * 2.0;
    result += simplex_noise(vec3((p+flow*0.3)*2.0, time*0.15)) * 0.5;
    vec2 flow2 = curl(p*3.0+vec2(sin(time*0.2),cos(time*0.15)), time*0.2) * intensity;
    result += simplex_noise(vec3((p+flow2*0.2)*4.0, time*0.25)) * 0.3;
    vec2 flow3 = curl(p*6.0+vec2(cos(time*0.3),sin(time*0.25)), time*0.3) * intensity * 0.5;
    result += simplex_noise(vec3((p+flow3*0.1)*8.0, time*0.4)) * 0.2;
    float dist = length(p - vec2(0.5));
    float angle = atan(p.y-0.5, p.x-0.5);
    float spiral = sin(dist*15.0 - angle*2.0 + time*0.3)*0.5+0.5;
    result = mix(result, spiral, 0.3) * 0.5 + 0.5;
    return result;
  }

  void main() {
    vec2 uv = v_uv;
    float screenAspect = u_resolution.x / u_resolution.y;
    float ratio = u_imageAspect / screenAspect;
    vec2 texCoord;
    if (ratio > 1.0) {
      texCoord = vec2(uv.x, mix(0.5-0.5*ratio, 0.5+0.5*ratio, uv.y));
    } else {
      texCoord = vec2(mix(0.5-0.5/ratio, 0.5+0.5/ratio, uv.x), uv.y);
    }

    // Clamp out-of-bounds pixels to prevent green artifacts
    if (texCoord.x < 0.0 || texCoord.x > 1.0 || texCoord.y < 0.0 || texCoord.y > 1.0) {
      gl_FragColor = vec4(0.067, 0.067, 0.067, 1.0);
      return;
    }
    texCoord = clamp(texCoord, 0.0, 1.0);

    vec4 tex = texture2D(u_texture, texCoord);
    vec3 originalColor = tex.rgb;
    float gray = dot(originalColor, vec3(0.299, 0.587, 0.114));
    vec3 invertedColor = vec3(1.0 - gray);

    vec2 correctedUV = uv;
    correctedUV.x *= screenAspect;
    vec2 correctedMouse = u_mouse;
    correctedMouse.x *= screenAspect;
    float dist = distance(correctedUV, correctedMouse);
    float marbleEffect = inkMarbling(uv*2.0 + u_time*u_speed*0.1, u_time, u_turbulenceIntensity*2.0);
    float jaggedDist = dist + (marbleEffect-0.5) * u_turbulenceIntensity * 2.0;
    float mask = u_radius > 0.001 ? step(jaggedDist, u_radius) : 0.0;

    vec3 finalColor = mix(originalColor, invertedColor, mask);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

interface InversionLensProps {
  src: string;
  type?: "image" | "video";
  className?: string;
}

export default function InversionLens({ src, type = "image", className = "" }: InversionLensProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    let animFrameId: number;
    let isInView = false;
    let isHovering = false;
    let uniforms: Record<string, { value: any }>;
    let videoEl: HTMLVideoElement | null = null;
    let videoReady = false;
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const lerpedMouse = new THREE.Vector2(0.5, 0.5);

    const setupScene = (texture: THREE.Texture, aspect: number) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      const scene = new THREE.Scene();
      const w = container.clientWidth;
      const h = container.clientHeight;
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      uniforms = {
        u_texture: { value: texture },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(w, h) },
        u_radius: { value: 0 },
        u_speed: { value: 0.75 },
        u_imageAspect: { value: aspect },
        u_turbulenceIntensity: { value: 0.225 },
      };

      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        uniforms, vertexShader, fragmentShader,
        depthTest: false, depthWrite: false,
      });

      scene.add(new THREE.Mesh(geometry, material));

      renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: "high-performance",
        alpha: false,
      });
      renderer.setClearColor(0x111111, 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      container.appendChild(renderer.domElement);

      const animate = () => {
        animFrameId = requestAnimationFrame(animate);
        if (!isInView) return;
        if (type === "video" && videoEl) {
          if (videoEl.readyState < 2) return;
          videoReady = true;
          texture.needsUpdate = true;
        }
        lerpedMouse.lerp(targetMouse, 0.1);
        uniforms.u_mouse.value.copy(lerpedMouse);
        if (isHovering) uniforms.u_time.value += 0.01;
        renderer.render(scene, camera);
      };
      animate();
      if (type !== "video") renderer.render(scene, camera);

      const resizeObserver = new ResizeObserver(() => {
        if (!renderer || !uniforms) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        uniforms.u_resolution.value.set(w, h);
      });
      resizeObserver.observe(container);
      return resizeObserver;
    };

    let resizeObs: ResizeObserver | undefined;

    if (type === "video") {
      videoEl = document.createElement("video");
      videoEl.src = src;
      videoEl.crossOrigin = "anonymous";
      videoEl.loop = true;
      videoEl.muted = true;
      videoEl.playsInline = true;
      videoEl.preload = "auto";

      const initVideo = () => {
        if (!videoEl || videoEl.readyState < 3) return;
        videoEl.currentTime = 0.01;
        videoEl.play().catch(() => {});
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!videoEl) return;
            const aspect = videoEl.videoWidth / videoEl.videoHeight || 16 / 9;
            const texture = new THREE.VideoTexture(videoEl);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBAFormat;
            resizeObs = setupScene(texture, aspect);
          });
        });
      };

      videoEl.addEventListener("canplaythrough", initVideo, { once: true });
      videoEl.load();
    } else {
      const loader = new THREE.TextureLoader();
      loader.crossOrigin = "anonymous";
      loader.load(src, (texture) => {
        const aspect = texture.image.width / texture.image.height;
        resizeObs = setupScene(texture, aspect);
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (inside !== isHovering) {
        isHovering = inside;
        if (uniforms) {
          const start = uniforms.u_radius.value;
          const end = inside ? 0.35 : 0;
          const duration = inside ? 400 : 300;
          const startTime = performance.now();
          const animateRadius = (now: number) => {
            const t = Math.min((now - startTime) / duration, 1);
            const eased = inside ? 1 - Math.pow(1 - t, 3) : t * t;
            uniforms.u_radius.value = start + (end - start) * eased;
            if (t < 1) requestAnimationFrame(animateRadius);
          };
          requestAnimationFrame(animateRadius);
        }
      }

      if (inside) {
        targetMouse.x = (e.clientX - rect.left) / rect.width;
        targetMouse.y = 1 - (e.clientY - rect.top) / rect.height;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { isInView = entry.isIntersecting; }),
      { threshold: 0.1 }
    );
    observer.observe(container);
    document.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animFrameId);
      document.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      resizeObs?.disconnect();
      if (videoEl) { videoEl.pause(); videoEl.src = ""; }
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [src, type]);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", overflow: "hidden", background: "#111" }} />
  );
}
