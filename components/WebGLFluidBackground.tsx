'use client';

import { useEffect, useRef } from 'react';

export default function WebGLFluidBackground() {
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

            // Pseudo-random noise
            float random (in vec2 _st) {
                return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            // 2D Noise
            float noise (in vec2 _st) {
                vec2 i = floor(_st);
                vec2 f = fract(_st);

                float a = random(i);
                float b = random(i + vec2(1.0, 0.0));
                float c = random(i + vec2(0.0, 1.0));
                float d = random(i + vec2(1.0, 1.0));

                vec2 u = f * f * (3.0 - 2.0 * f);

                return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
            }

            void main() {
                vec2 st = gl_FragCoord.xy / resolution.xy;
                float ratio = resolution.x / resolution.y;
                st.x *= ratio;
                vec2 m = mouse;
                m.x *= ratio;

                vec3 color = vec3(0.0);
                
                // Layered Octaves for more fluid movement
                vec2 pos = st * 1.5;
                float mouseDist = distance(st, m);
                float mouseShape = smoothstep(0.8, 0.0, mouseDist);
                
                pos += mouseShape * 0.3 * sin(time * 0.5);

                float t1 = noise(pos + time * 0.1);
                float t2 = noise(pos * 2.0 - time * 0.05);
                float t3 = noise(pos * 4.0 + time * 0.02);
                
                float mask = t1 * 0.5 + t2 * 0.3 + t3 * 0.2;
                mask = smoothstep(0.3, 0.7, mask);

                // Gold Colors
                vec3 goldDeep = vec3(0.15, 0.12, 0.05);
                vec3 goldMid = vec3(0.77, 0.63, 0.35);
                vec3 goldBright = vec3(1.0, 0.9, 0.6);

                color = mix(goldDeep, goldMid, mask);
                color = mix(color, goldBright, pow(mask, 3.0) * 0.5);
                
                // Add mouse glow
                color += goldMid * mouseShape * 0.15;

                // Vignette & Contrast
                float dist = distance(gl_FragCoord.xy / resolution.xy, vec2(0.5));
                float vignette = smoothstep(1.2, 0.2, dist);
                color *= vignette;

                gl_FragColor = vec4(color, 1.0);
            }
        `;

        // Shader Helper Functions
        function createShader(gl: WebGLRenderingContext, type: number, source: string) {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
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

        const vertices = new Float32Array([
            -1, -1, 1, -1, -1, 1,
            -1, 1, 1, -1, 1, 1,
        ]);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const timeLocation = gl.getUniformLocation(program, 'time');
        const resolutionLocation = gl.getUniformLocation(program, 'resolution');
        const mouseLocation = gl.getUniformLocation(program, 'mouse');

        let mouseX = 0.5;
        let mouseY = 0.5;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = 1.0 - (e.clientY / window.innerHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);

        const render = (now: number) => {
            if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
                gl.viewport(0, 0, canvas.width, canvas.height);
            }

            gl.uniform1f(timeLocation, now * 0.001);
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
            gl.uniform2f(mouseLocation, mouseX, mouseY);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-screen"
            style={{ filter: 'blur(30px)' }}
        />
    );
}
