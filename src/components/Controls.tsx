"use client";

import { useRobotStore } from "@/store/useRobotStore";
import { RotateCcw, MonitorPlay } from "lucide-react";

export default function Controls() {
    const state = useRobotStore();

    const sliders = [
        { label: "Base Rotation", value: state.baseRotation, set: state.setBaseRotation, min: -Math.PI, max: Math.PI, step: 0.01 },
        { label: "Shoulder", value: state.shoulderRotation, set: state.setShoulderRotation, min: -Math.PI / 2, max: Math.PI / 2, step: 0.01 },
        { label: "Elbow", value: state.elbowRotation, set: state.setElbowRotation, min: -Math.PI / 1.2, max: Math.PI / 1.2, step: 0.01 },
        { label: "Wrist", value: state.wristRotation, set: state.setWristRotation, min: -Math.PI, max: Math.PI, step: 0.01 },
        { label: "Gripper", value: state.gripperGap, set: state.setGripperGap, min: 0.1, max: 0.6, step: 0.01, icon: ":::" },
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* Control Card */}
            <div className="bg-slate-100 p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Robot Controls</h2>
                    <button
                        onClick={state.reset}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        <RotateCcw size={16} />
                        Reset
                    </button>
                </div>

                <div className="space-y-6">
                    {sliders.map((item, idx) => (
                        <div key={idx} className="space-y-2">
                            <div className="flex justify-between text-sm font-medium text-slate-700">
                                <span className="flex items-center gap-2">
                                    {item.icon && <span className="text-slate-400 font-bold text-lg leading-none mb-1">:::</span>}
                                    {item.label}
                                </span>
                                <span className="text-slate-500 font-mono">
                                    {item.label === "Gripper"
                                        ? `${Math.round(((item.value - 0.1) / 0.5) * 100)}%`
                                        : `${Math.round((item.value * 180) / Math.PI)}°`}
                                </span>
                            </div>
                            <input
                                type="range"
                                min={item.min}
                                max={item.max}
                                step={item.step}
                                value={item.value}
                                onChange={(e) => {
                                    // Auto rotate가 켜져있고 Base 슬라이더를 건드리면 Auto 끄기
                                    if (item.label === "Base Rotation" && state.autoRotate) state.toggleAutoRotate();
                                    item.set(parseFloat(e.target.value))
                                }}
                                className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Auto Rotate Base</span>
                    <button
                        onClick={state.toggleAutoRotate}
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${state.autoRotate ? 'bg-indigo-600' : 'bg-slate-300'}`}
                    >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${state.autoRotate ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>
            </div>

            {/* Guide Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-3">Controls Guide</h3>
                <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                    <li>Use sliders to control each joint rotation</li>
                    <li>Click and drag to rotate the camera view</li>
                    <li>Scroll to zoom in and out</li>
                    <li>Toggle auto-rotate for continuous base rotation</li>
                </ul>
            </div>
        </div>
    );
}