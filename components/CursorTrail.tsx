'use client';

import { useEffect, useRef } from 'react';

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) return;

        const vertexSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const fragmentSource = `
            precision highp float;
            uniform float time;
            uniform vec2 resolution;
            uniform vec2 mouse;
            uniform vec2 prevMouse;

            void main() {
                vec2 st = gl_FragCoord.xy / resolution.xy;
                float dist = distance(st, mouse);
                
                // Cursor Glow
                float glow = smoothstep(0.08, 0.0, dist);
                
                // Liquid motion based on velocity? (Simple approximation)
                float velocity = distance(mouse, prevMouse);
                float trail = smoothstep(0.05 + velocity * 1.5, 0.0, dist);

                vec3 gold = vec3(0.77, 0.63, 0.35);
                vec3 color = gold * (glow * 0.01 + trail * 0.06);
                
                // Add a bit of prismatic flicker
                color.r += sin(time * 10.0 + st.y * 100.0) * 0.01 * glow;
                color.b += cos(time * 12.0 + st.x * 100.0) * 0.01 * glow;

                gl_FragColor = vec4(color, color.r * 1.2);
            }
        `;

        function createShader(gl: WebGLRenderingContext, type: number, source: string) {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        }

        const vs = createShader(gl, gl.VERTEX_SHADER, vertexSource);
        const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
        if (!vs || !fs) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);

        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const posLoc = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        const tLoc = gl.getUniformLocation(program, 'time');
        const rLoc = gl.getUniformLocation(program, 'resolution');
        const mLoc = gl.getUniformLocation(program, 'mouse');
        const pmLoc = gl.getUniformLocation(program, 'prevMouse');

        let mX = 0, mY = 0, pmX = 0, pmY = 0;

        const onMove = (e: MouseEvent) => {
            pmX = mX; pmY = mY;
            mX = e.clientX / window.innerWidth;
            mY = 1.0 - (e.clientY / window.innerHeight);
        };

        window.addEventListener('mousemove', onMove);

        const render = (now: number) => {
            if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
                gl.viewport(0, 0, canvas.width, canvas.height);
            }
            gl.uniform1f(tLoc, now * 0.001);
            gl.uniform2f(rLoc, canvas.width, canvas.height);
            gl.uniform2f(mLoc, mX, mY);
            gl.uniform2f(pmLoc, pmX, pmY);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);

        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[9999] opacity-50 mix-blend-screen"
        />
    );
}
