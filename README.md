# 🦾 Robot Arm Manipulator

A web-based interactive 3D robot arm simulator built with **Next.js**, **React Three Fiber (R3F)**, and **TypeScript**.
This project demonstrates **Forward Kinematics**, allowing users to control joint rotations in real-time through a synchronized UI.

🔗 **Live Demo:** [Insert Your GitHub Pages Link Here]
![Project Preview](https://github.com/user-attachments/assets/placeholder.png)

📂 Project Structure
├── .github/workflows  # GitHub Actions deployment configuration
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js App Router (Pages & Layout)
│   ├── components/    # React Components
│   │   ├── Controls.tsx   # UI Control Panel
│   │   ├── Experience.tsx # Main 3D Scene Wrapper
│   │   ├── RobotArm.tsx   # 3D Robot Logic & Meshes
│   │   └── ...
│   ├── store/
│   │   └── useRobotStore.ts # Global State (Zustand)
│   └── ...
└── next.config.ts     # Configuration for Static Export

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Core** | Next.js 14+ (App Router), TypeScript |
| **3D Engine** | Three.js, React Three Fiber (R3F) |
| **Helpers** | @react-three/drei |
| **State Management** | Zustand |
| **Styling** | Tailwind CSS |
| **Deployment** | GitHub Actions (Static Export) |

## ✨ Key Features

* **Interactive 3D Simulation:**
    * Implemented **Forward Kinematics** using a hierarchical 3D group structure (Base → Shoulder → Elbow → Wrist).
    * Real-time synchronization between 2D UI sliders and 3D model rotations using **Zustand**.
* **High-Fidelity Visuals:**
    * **PBR Materials:** Realistic metal textures using `metalness`, `roughness`, and HDRI Environment mapping (`city` preset).
    * **Stylized Outlines:** Custom implementation of the **Inverted Hull** method for performant, cartoon-style outlines without post-processing overhead.
* **Responsive UI:**
    * Fully responsive layout built with **Tailwind CSS**.
    * Split-screen view for desktop and stacked layout for mobile devices.
* **Stability & Optimization:**
    * Optimized geometry and material reuse with `useMemo`.
    * Handled WebGL context loss and GPU crashes in development environments.

## 🚀 Technical Challenges & Solutions

### 1. 3D Outlines Implementation (Inverted Hull Method)
**Problem:** Initial attempts using post-processing effects (`OutlinePass`) caused performance drops, and the `@react-three/drei` `<Outlines />` component caused infinite render loops (`Maximum update depth exceeded`) due to state updates.

**Solution:** Implemented the **"Inverted Hull"** technique manually.
* Created duplicate meshes for each part with a slightly larger scale.
* Applied a `BackSide` material to the hull meshes.
* This approach eliminated React state conflicts and significantly improved render performance compared to post-processing.

### 2. WebGL Context Lost & GPU Crashes
**Problem:** Loading high-resolution HDRI Environment maps in Next.js development mode frequently caused the WebGL context to crash due to `React.StrictMode` double-invoking the heavy 3D scene initialization.

**Solution:**
* Disabled Strict Mode (`reactStrictMode: false`) in `next.config.ts` to prevent double-mounting of the Canvas.
* Wrapped heavy 3D assets (Environment, Models) with `<Suspense>` to handle asynchronous loading gracefully.
* Optimized camera settings by passing them as static objects to prevent unnecessary re-renders.

### 3. Deploying Next.js to GitHub Pages
**Problem:** Next.js defaults to Server-Side Rendering (SSR), which is incompatible with GitHub Pages (static hosting). Additionally, asset paths broke (`404`) due to the repository name sub-path.

**Solution:**
* Configured `output: 'export'` in `next.config.ts` for static site generation.
* Set up a **GitHub Actions** workflow (`deploy.yml`) to automatically build and deploy artifacts on push.
* Correctly configured `basePath` and image paths to handle the repository sub-directory structure.

## 📦 Installation

```bash
# 1. Clone the repository
git clone [https://github.com/your-username/Robot-Arm-Manipulator.git](https://github.com/your-username/Robot-Arm-Manipulator.git)

# 2. Navigate to the project directory
cd Robot-Arm-Manipulator

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
