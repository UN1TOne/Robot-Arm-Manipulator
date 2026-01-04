"use client";

import dynamic from "next/dynamic";
import Controls from "@/components/Controls";

const ThreeScene = dynamic(() => import("@/components/ThreeScene"), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 lg:p-8 font-sans">
      <header className="max-w-7xl mx-auto mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Robot Arm Manipulator
          </h1>
          <p className="text-slate-500 mt-1">Interactive 3D robotic arm simulation</p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-600">System Active</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
        {/* Left Column: 3D Scene */}
        <div className="lg:col-span-2 h-full">
          <ThreeScene />
        </div>

        {/* Right Column: Controls */}
        <div className="lg:col-span-1 h-full overflow-y-auto">
          <Controls />
        </div>
      </div>
    </main>
  );
}