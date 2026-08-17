import { useEffect, useRef } from "react";

const GlobalAINetworkCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let scrollFactor = 1.0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const heroHeight = window.innerHeight;
      if (scrollY < heroHeight) {
        scrollFactor = 1.0 - (scrollY / heroHeight) * 0.35;
      } else {
        scrollFactor = 0.65;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Mouse tracking for subtle attraction
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const colors = [
      "rgba(255, 255, 255, ",
      "rgba(147, 197, 253, ", // blue-300
      "rgba(167, 139, 250, ", // violet-400
      "rgba(192, 132, 252, ", // purple-400
      "rgba(125, 175, 255, ", // soft blue
    ];

    // 3-Layer Depth System
    const nodes = [];

    // Layer 0: FARTHEST LAYER (14 nodes, faint, slow drift)
    for (let i = 0; i < 14; i++) {
      nodes.push({
        layer: 0,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        baseRadius: 2.0 + Math.random() * 0.8,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: 0.3 + Math.random() * 0.2,
        glowBlur: 4,
        parallaxFactor: 0.08,
        maxConnectDist: 140,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.6 + Math.random() * 0.4,
      });
    }

    // Layer 1: MIDDLE LAYER (26 nodes, crisp connections)
    for (let i = 0; i < 26; i++) {
      nodes.push({
        layer: 1,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        baseRadius: 3.5 + Math.random() * 1.5,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: 0.65 + Math.random() * 0.25,
        glowBlur: 12,
        parallaxFactor: 0.25,
        maxConnectDist: 180,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.9 + Math.random() * 0.6,
      });
    }

    // Layer 2: NEAREST LAYER (10 nodes, bright, slight glow)
    for (let i = 0; i < 10; i++) {
      nodes.push({
        layer: 2,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        baseRadius: 4.5 + Math.random() * 1.8,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: 0.85 + Math.random() * 0.15,
        glowBlur: 18,
        parallaxFactor: 0.45,
        maxConnectDist: 200,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 1.1 + Math.random() * 0.8,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        const dxMouse = mouse.x - node.x;
        const dyMouse = mouse.y - node.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180 && distMouse > 0) {
          const attractForce = ((180 - distMouse) / 180) * 0.08 * node.parallaxFactor;
          node.x += (dxMouse / distMouse) * attractForce * 3;
          node.y += (dyMouse / distMouse) * attractForce * 3;
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -30) node.x = width + 30;
        if (node.x > width + 30) node.x = -30;
        if (node.y < -30) node.y = height + 30;
        if (node.y > height + 30) node.y = -30;
      }

      for (let l = 0; l < 3; l++) {
        const layerNodes = nodes.filter((n) => n.layer === l);

        for (let i = 0; i < layerNodes.length; i++) {
          const n1 = layerNodes[i];
          for (let j = i + 1; j < layerNodes.length; j++) {
            const n2 = layerNodes[j];

            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const connectThreshold = n1.maxConnectDist;

            if (dist < connectThreshold) {
              const alpha =
                (1 - dist / connectThreshold) *
                (l === 0 ? 0.12 : l === 1 ? 0.24 : 0.32) *
                scrollFactor;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
              ctx.lineWidth = l === 0 ? 0.7 : l === 1 ? 1.1 : 1.4;
              ctx.stroke();
            }
          }
        }

        for (let i = 0; i < layerNodes.length; i++) {
          const node = layerNodes[i];
          const pulse =
            0.88 + Math.sin(time * node.pulseSpeed + node.pulseOffset) * 0.12;
          const currentRadius = node.baseRadius * pulse;
          const currentAlpha =
            Math.min(
              1,
              node.baseAlpha *
                (0.88 + Math.sin(time * node.pulseSpeed + node.pulseOffset) * 0.12),
            ) * scrollFactor;

          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius * 2.0, 0, Math.PI * 2);
          ctx.fillStyle = `${node.colorPrefix}${currentAlpha * 0.15})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = `${node.colorPrefix}${currentAlpha})`;
          ctx.shadowColor = node.colorPrefix.replace(", ", ", 0.85)");
          ctx.shadowBlur = node.glowBlur * pulse * scrollFactor;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0B0D12]">
      {/* 3-Layer Connected Node Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* Persistent Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient top/bottom radial light streaks */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
    </div>
  );
};

export default GlobalAINetworkCanvas;
