import { useRef, useEffect } from 'react';
import { Mesh } from 'three';
import { useMeshStore } from '../meshStore/meshStore';

interface JointPreview {
  from: string;
  to: string;
  position: [number, number, number];
  angle: number;
  jointType: 'T' | 'L' | 'Cross' | 'Corner';
  mesh1Params: [number, number, number];
  mesh2Params: [number, number, number];
}

function JointGeometry({ jointType, mesh1Params, mesh2Params, position, angle }: { 
  jointType: 'T' | 'L' | 'Cross' | 'Corner';
  mesh1Params: [number, number, number];
  mesh2Params: [number, number, number];
  position: [number, number, number];
  angle: number;
}) {
  switch (jointType) {
    case 'L':
      return (
        <group position={position}>
          <mesh>
            <sphereGeometry args={[Math.max(...mesh1Params, ...mesh2Params) * 0.1, 12, 12]} />
            <meshStandardMaterial color="#4CAF50" transparent opacity={0.8} />
          </mesh>
          <mesh position={[mesh1Params[0] * 0.3, 0, 0]}>
            <boxGeometry args={[mesh1Params[0] * 0.6, mesh1Params[1] * 0.1, mesh1Params[2] * 0.1]} />
            <meshStandardMaterial color="#2196F3" transparent opacity={0.6} />
          </mesh>
          <mesh position={[0, mesh2Params[1] * 0.3, 0]} rotation={[0, 0, (angle * Math.PI) / 180]}>
            <boxGeometry args={[mesh2Params[0] * 0.1, mesh2Params[1] * 0.6, mesh2Params[2] * 0.1]} />
            <meshStandardMaterial color="#FF9800" transparent opacity={0.6} />
          </mesh>
        </group>
      );
    
    case 'T':
      return (
        <group position={position}>
          <mesh>
            <cylinderGeometry args={[Math.max(...mesh1Params) * 0.15, Math.max(...mesh1Params) * 0.15, Math.min(...mesh1Params) * 0.2, 16]} />
            <meshStandardMaterial color="#9C27B0" transparent opacity={0.8} />
          </mesh>
          <mesh>
            <boxGeometry args={[mesh1Params[0] * 1.2, mesh1Params[1] * 0.1, mesh1Params[2] * 0.1]} />
            <meshStandardMaterial color="#2196F3" transparent opacity={0.5} />
          </mesh>
          <mesh position={[0, mesh2Params[1] * 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[mesh2Params[0] * 0.1, mesh2Params[1] * 0.6, mesh2Params[2] * 0.1]} />
            <meshStandardMaterial color="#FF9800" transparent opacity={0.6} />
          </mesh>
        </group>
      );
    
    case 'Cross':
      return (
        <group position={position}>
          <mesh>
            <sphereGeometry args={[Math.max(...mesh1Params, ...mesh2Params) * 0.12, 16, 16]} />
            <meshStandardMaterial color="#F44336" transparent opacity={0.8} />
          </mesh>
          <mesh>
            <boxGeometry args={[mesh1Params[0] * 1.2, mesh1Params[1] * 0.08, mesh1Params[2] * 0.08]} />
            <meshStandardMaterial color="#2196F3" transparent opacity={0.5} />
          </mesh>
          <mesh rotation={[0, 0, (angle * Math.PI) / 180]}>
            <boxGeometry args={[mesh2Params[0] * 1.2, mesh2Params[1] * 0.08, mesh2Params[2] * 0.08]} />
            <meshStandardMaterial color="#FF9800" transparent opacity={0.5} />
          </mesh>
        </group>
      );
    
    case 'Corner':
      return (
        <group position={position}>
          <mesh>
            <coneGeometry args={[Math.max(...mesh1Params) * 0.1, Math.max(...mesh1Params) * 0.2, 8]} />
            <meshStandardMaterial color="#FF5722" transparent opacity={0.8} />
          </mesh>
          <mesh position={[mesh1Params[0] * 0.2, 0, 0]} rotation={[0, 0, (angle * Math.PI) / 360]}>
            <boxGeometry args={[mesh1Params[0] * 0.4, mesh1Params[1] * 0.08, mesh1Params[2] * 0.08]} />
            <meshStandardMaterial color="#2196F3" transparent opacity={0.6} />
          </mesh>
          <mesh position={[-mesh2Params[0] * 0.2, 0, 0]} rotation={[0, 0, -(angle * Math.PI) / 360]}>
            <boxGeometry args={[mesh2Params[0] * 0.4, mesh2Params[1] * 0.08, mesh2Params[2] * 0.08]} />
            <meshStandardMaterial color="#FF9800" transparent opacity={0.6} />
          </mesh>
        </group>
      );
    
    default:
      return null;
  }
}

function JointHighlight({ joint }: { joint: JointPreview }) {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      if (meshRef.current) {
        const time = Date.now() * 0.003;
        const scale = 0.9 + Math.sin(time) * 0.1;
        meshRef.current.scale.setScalar(scale);
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <group ref={meshRef}>
      <JointGeometry jointType={joint.jointType} mesh1Params={joint.mesh1Params} mesh2Params={joint.mesh2Params} position={joint.position} angle={joint.angle}
      />
      
      <group position={joint.position}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.02, 0.2, 0.02]} />
          <meshStandardMaterial color="#FFEB3B" transparent opacity={0.8} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.1]}>
          <boxGeometry args={[0.02, 0.2, 0.02]} />
          <meshStandardMaterial color="#FFEB3B" transparent opacity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

export function JointHighlights() {
  const jointPreviews = useMeshStore(state => state.jointPreviews);

  return (
    <>
      {jointPreviews.map((joint, index) => (
        <JointHighlight key={`${joint.from}-${joint.to}-${index}`} joint={joint}
        />
      ))}
    </>
  );
}

export default JointHighlight;