"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import { Suspense } from "react";
import RobotArm from "./RobotArm";

function Loader() {
    return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">Loading...</div>;
}

export default function ThreeScene() {
    return (
        <div className="w-full h-[500px] lg:h-full bg-[#0f172a] rounded-lg overflow-hidden relative shadow-inner">
            <Canvas shadows camera={{ position: [5, 5, 8], fov: 75 }}>
                <color attach="background" args={["#1e293b"]} />

                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Suspense fallback={null}>
                    <RobotArm />

                    <Environment preset="city" />
                </Suspense>

                <Grid
                    position={[0, -2, 0]}
                    args={[20, 20]}
                    cellColor="#6b7280"
                    sectionColor="#4f46e5"
                    fadeDistance={20}
                    fadeStrength={1}
                />

                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
            </Canvas>

            <div className="absolute top-4 left-4 text-white/50 text-xs select-none">
                Interactive 3D View
            </div>
        </div>
    );
}