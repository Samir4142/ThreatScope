import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

// 1. HELPER: CONVERT LAT/LON TO 3D POSITION
const calcPosFromLatLonRad = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    return [x, y, z];
};

const Loader = () => (
    <Html center>
        <div className="flex items-center gap-2 bg-black/80 px-4 py-2 rounded border border-cyan-900 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"></div>
            <span className="text-xs font-mono text-cyan-500 tracking-widest">ESTABLISHING UPLINK...</span>
        </div>
    </Html>
);

const Earth = ({ targetLoc }) => {
    const earthRef = useRef();

    // LOAD HIGH-RES TEXTURES
    const [colorMap, normalMap, specularMap] = useLoader(TextureLoader, [
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg"
    ]);

    const pinPosition = useMemo(() => {
        if (targetLoc) return calcPosFromLatLonRad(targetLoc.lat, targetLoc.lon, 2.5);
        return null;
    }, [targetLoc]);

    const pinQuaternion = useMemo(() => {
        if (!pinPosition) return null;
        const dummy = new THREE.Object3D();
        dummy.position.set(pinPosition[0], pinPosition[1], pinPosition[2]);
        dummy.lookAt(0, 0, 0);
        return dummy.quaternion;
    }, [pinPosition]);

    useFrame(() => {
        if (!earthRef.current) return;

        if (targetLoc) {
            const targetLonRad = targetLoc.lon * (Math.PI / 180);
            const targetLatRad = targetLoc.lat * (Math.PI / 180);

            const desiredY = -targetLonRad - (Math.PI / 2);
            const desiredX = targetLatRad;

            earthRef.current.rotation.y += (desiredY - earthRef.current.rotation.y) * 0.05;
            earthRef.current.rotation.x += (desiredX - earthRef.current.rotation.x) * 0.05;
        } else {
            earthRef.current.rotation.y += 0.001;
        }
    });

    return (
        <group ref={earthRef}>
            <mesh>
                <sphereGeometry args={[2.5, 64, 64]} />
                <meshPhongMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    specularMap={specularMap}
                    specular={new THREE.Color(0x333333)}
                    shininess={15}
                />
            </mesh>

            {pinPosition && pinQuaternion && (
                <group position={pinPosition} quaternion={pinQuaternion}>
                    <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.02, 0.005, 0.6, 8]} />
                        <meshStandardMaterial color="#e0e0e0" metalness={0.9} roughness={0.1} />
                    </mesh>
                    <mesh position={[0, 0, -0.6]}>
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshStandardMaterial color="#ef4444" emissive="#7f1d1d" emissiveIntensity={0.6} />
                    </mesh>
                    <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[0.06, 0.12, 32]} />
                        <meshBasicMaterial color="#ef4444" transparent opacity={0.6} side={THREE.DoubleSide} />
                    </mesh>
                </group>
            )}
        </group>
    );
};

const Globe3D = ({ targetLoc }) => {
    return (
        <div className="h-full w-full absolute inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                {/* LIGHTING FIX: INCREASED INTENSITY */}
                <ambientLight intensity={1.2} />
                <pointLight position={[20, 10, 10]} intensity={5.0} />
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                <Suspense fallback={<Loader />}>
                    <Earth targetLoc={targetLoc} />
                </Suspense>

                <OrbitControls enableZoom={true} enablePan={true} autoRotate={false} minDistance={3} maxDistance={8} />
            </Canvas>
        </div>
    );
};

export default Globe3D;