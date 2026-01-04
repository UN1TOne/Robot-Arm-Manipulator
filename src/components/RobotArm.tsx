"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useRobotStore } from "@/store/useRobotStore";
import { Group } from "three";
import { Outlines } from "@react-three/drei";

export default function RobotArm() {
    const {
        baseRotation,
        shoulderRotation,
        elbowRotation,
        wristRotation,
        gripperGap,
        autoRotate,
        setBaseRotation,
    } = useRobotStore();

    const baseRef = useRef<Group>(null);

    useFrame(() => {
        if (autoRotate && baseRef.current) {
            const nextRotation = (baseRotation + 0.01) % (Math.PI * 2);
            setBaseRotation(nextRotation);
        }
    });

    const targetColor = "#5a80bd";
    const metalMaterial = <meshStandardMaterial color={targetColor} roughness={0.4} metalness={0.1} />;
    const jointMaterial = <meshStandardMaterial color="#4338ca" roughness={0.4} metalness={0.2} />;

    const outlineConfig = <Outlines thickness={2} color="black" />;

    return (
        <group position={[0, -2, 0]}>
            <group ref={baseRef} rotation={[0, baseRotation, 0]}>

                {/* Base */}
                <mesh position={[0, 0.5, 0]}>
                    <cylinderGeometry args={[1.5, 2, 1, 32]} />
                    <meshStandardMaterial color="#5e8dd8" metalness={0.9}
                        roughness={0.2} />
                    {outlineConfig}
                </mesh>

                <group position={[0, 1.5, 0]} rotation={[0, 0, shoulderRotation]}>
                    <mesh>
                        <sphereGeometry args={[0.7, 32, 32]} />
                        {jointMaterial}
                        {outlineConfig}
                    </mesh>

                    {/* Upper Arm */}
                    <mesh position={[0, 1.5, 0]}>
                        <cylinderGeometry args={[0.3, 0.3, 3, 16]} />
                        {metalMaterial}
                        {outlineConfig}
                    </mesh>

                    <group position={[0, 3, 0]} rotation={[0, 0, elbowRotation]}>
                        <mesh>
                            <sphereGeometry args={[0.6, 32, 32]} />
                            {jointMaterial}
                            {outlineConfig}
                        </mesh>

                        {/* Forearm */}
                        <mesh position={[0, 1.5, 0]}>
                            <cylinderGeometry args={[0.25, 0.25, 3, 16]} />
                            {metalMaterial}
                            {outlineConfig}
                        </mesh>

                        <group position={[0, 3, 0]} rotation={[0, 0, wristRotation]}>
                            <mesh>
                                <sphereGeometry args={[0.5, 32, 32]} />
                                {jointMaterial}
                                {outlineConfig}
                            </mesh>

                            {/* Gripper Base */}
                            <mesh position={[0, 0.5, 0]}>
                                <boxGeometry args={[1, 0.2, 0.5]} />
                                <meshStandardMaterial color="#475569" />
                                {outlineConfig}
                            </mesh>

                            {/* Grippers */}
                            <mesh position={[-gripperGap, 1, 0]}>
                                <boxGeometry args={[0.1, 1, 0.3]} />
                                <meshStandardMaterial color="#d97706" />
                                {outlineConfig}
                            </mesh>

                            <mesh position={[gripperGap, 1, 0]}>
                                <boxGeometry args={[0.1, 1, 0.3]} />
                                <meshStandardMaterial color="#d97706" />
                                {outlineConfig}
                            </mesh>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    );
}