import { create } from 'zustand';

interface RobotState {
    baseRotation: number;
    shoulderRotation: number;
    elbowRotation: number;
    wristRotation: number;
    gripperGap: number;
    autoRotate: boolean;

    setBaseRotation: (val: number) => void;
    setShoulderRotation: (val: number) => void;
    setElbowRotation: (val: number) => void;
    setWristRotation: (val: number) => void;
    setGripperGap: (val: number) => void;
    toggleAutoRotate: () => void;
    reset: () => void;
}

export const useRobotStore = create<RobotState>((set) => ({
    baseRotation: 0,
    shoulderRotation: 0,
    elbowRotation: -Math.PI / 4,
    wristRotation: -Math.PI / 4,
    gripperGap: 0.5,
    autoRotate: false,

    setBaseRotation: (val) => set({ baseRotation: val }),
    setShoulderRotation: (val) => set({ shoulderRotation: val }),
    setElbowRotation: (val) => set({ elbowRotation: val }),
    setWristRotation: (val) => set({ wristRotation: val }),
    setGripperGap: (val) => set({ gripperGap: val }),
    toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),

    reset: () => set({
        baseRotation: 0,
        shoulderRotation: 0,
        elbowRotation: 0,
        wristRotation: 0,
        gripperGap: 0.5,
        autoRotate: false,
    }),
}));