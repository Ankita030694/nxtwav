import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface GramophonePlayerProps {
  audioUrl: string;
  coverArt: string;
  title: string;
  artist: string;
}

interface AudioVisualizerProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
}

// Audio-reactive gradient trails
function AudioVisualizer({ analyser, isPlaying }: AudioVisualizerProps) {
  const trailsRef = useRef<THREE.Group>(null);
  const dataArrayRef = useRef(new Uint8Array(new ArrayBuffer(128)));
  const meshRefs = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (analyser) {
      const buffer = new ArrayBuffer(analyser.frequencyBinCount);
      dataArrayRef.current = new Uint8Array(buffer);
    }
  }, [analyser]);

  useFrame((state) => {
    if (!analyser || !trailsRef.current) return;

    analyser.getByteFrequencyData(dataArrayRef.current);

    // Calculate frequency bands
    const bufferLength = dataArrayRef.current.length;
    const bassEnd = Math.floor(bufferLength * 0.1);
    const midEnd = Math.floor(bufferLength * 0.5);

    let bass = 0, mid = 0, treble = 0;
    for (let i = 0; i < bassEnd; i++) bass += dataArrayRef.current[i];
    for (let i = bassEnd; i < midEnd; i++) mid += dataArrayRef.current[i];
    for (let i = midEnd; i < bufferLength; i++) treble += dataArrayRef.current[i];

    bass = bass / bassEnd / 255;
    mid = mid / (midEnd - bassEnd) / 255;
    treble = treble / (bufferLength - midEnd) / 255;

    // Update gradient trails
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;

      const angle = state.clock.elapsedTime * 0.5 + (i * Math.PI * 2) / 8;
      const radius = 2 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.5;
      const amplitude = isPlaying ? (bass + mid + treble) / 3 : 0.1;

      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.z = Math.sin(angle) * radius;
      mesh.position.y = Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * amplitude;

      // Audio-reactive colors
      const material = mesh.material as THREE.MeshStandardMaterial;
      const hue = (bass * 0.1 + mid * 0.3 + treble * 0.6 + i / 8) % 1;
      material.color.setHSL(hue, 0.8, 0.5 + amplitude * 0.3);
      material.emissive.setHSL(hue, 0.9, amplitude * 0.5);
      
      const scale = 0.1 + amplitude * 0.3;
      mesh.scale.setScalar(scale);
    });
  });

  return (
    <group ref={trailsRef}>
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// 3D Vinyl Record with cover art
function VinylRecord({ coverArt, isPlaying }: { coverArt: string; isPlaying: boolean }) {
  const recordRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(coverArt, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setTexture(tex);
    });
  }, [coverArt]);

  useFrame((state) => {
    if (recordRef.current && isPlaying) {
      recordRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group>
      {/* Vinyl record base */}
      <mesh ref={recordRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.05, 64]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Center label with cover art */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.02, 32]} />
        {texture ? (
          <meshStandardMaterial map={texture} roughness={0.5} />
        ) : (
          <meshStandardMaterial color="#333333" />
        )}
      </mesh>

      {/* Grooves effect rings */}
      {[0.6, 0.8, 1.0, 1.2, 1.4].map((r, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.11, 0]}>
          <ringGeometry args={[r, r + 0.02, 64]} />
          <meshStandardMaterial color="#1a1a1a" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// Gramophone/Turntable base
function TurntableBase() {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Main platform */}
      <mesh>
        <boxGeometry args={[4, 0.3, 3]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
      </mesh>
      
      {/* Decorative rim */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[4.2, 0.1, 3.2]} />
        <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Tonearm base */}
      <mesh position={[1.5, 0.3, -0.8]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
        <meshStandardMaterial color="#888888" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Tonearm */}
      <group position={[1.5, 0.5, -0.8]} rotation={[0, -0.5, 0]}>
        <mesh rotation={[0, 0, Math.PI / 6]} position={[-0.8, 0.3, 0.4]}>
          <cylinderGeometry args={[0.03, 0.03, 1.8, 8]} />
          <meshStandardMaterial color="#888888" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Cartridge */}
        <mesh position={[-1.5, 0.1, 0.8]}>
          <boxGeometry args={[0.15, 0.08, 0.1]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>
    </group>
  );
}

// Main 3D Scene
function Scene({ 
  analyser, 
  isPlaying, 
  coverArt 
}: { 
  analyser: AnalyserNode | null; 
  isPlaying: boolean;
  coverArt: string;
}) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#9d00ff" />
      <spotLight
        position={[0, 8, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#ffffff"
      />

      <TurntableBase />
      <VinylRecord coverArt={coverArt} isPlaying={isPlaying} />
      <AudioVisualizer analyser={analyser} isPlaying={isPlaying} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.5}
        autoRotate={!isPlaying}
        autoRotateSpeed={0.5}
      />
      <Environment preset="city" />
    </>
  );
}

// Mobile fallback with CSS animations
function MobileFallback({ 
  coverArt, 
  isPlaying, 
  onTogglePlay 
}: { 
  coverArt: string; 
  isPlaying: boolean;
  onTogglePlay: () => void;
}) {
  return (
    <div className="relative w-full aspect-square max-w-[300px] mx-auto">
      {/* Vinyl record */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br from-zinc-900 to-black shadow-2xl ${
          isPlaying ? "animate-spin" : ""
        }`}
        style={{ animationDuration: "3s" }}
      >
        {/* Grooves */}
        {[30, 45, 60, 75, 90].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-zinc-800"
            style={{
              width: `${size}%`,
              height: `${size}%`,
              top: `${(100 - size) / 2}%`,
              left: `${(100 - size) / 2}%`,
            }}
          />
        ))}
        
        {/* Center label */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full overflow-hidden border-4 border-zinc-700"
        >
          <img src={coverArt} alt="Cover" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Play button overlay */}
      <button
        onClick={onTogglePlay}
        className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 hover:opacity-100 transition-opacity"
      >
        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
          {isPlaying ? (
            <Pause className="w-8 h-8 text-primary-foreground" />
          ) : (
            <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
          )}
        </div>
      </button>

      {/* Audio reactive glow */}
      {isPlaying && (
        <div className="absolute inset-0 rounded-full animate-pulse-slow">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
          <div className="absolute inset-0 rounded-full bg-secondary/10 blur-2xl" />
        </div>
      )}
    </div>
  );
}

export function GramophonePlayer({ audioUrl, coverArt, title, artist }: GramophonePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.crossOrigin = "anonymous";
    audioRef.current.volume = volume / 100;

    audioRef.current.addEventListener("loadedmetadata", () => {
      setDuration(audioRef.current?.duration || 0);
    });

    audioRef.current.addEventListener("timeupdate", () => {
      setCurrentTime(audioRef.current?.currentTime || 0);
    });

    audioRef.current.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      audioContextRef.current?.close();
    };
  }, [audioUrl]);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current && audioRef.current) {
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      initAudioContext();
      audioContextRef.current?.resume();
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, initAudioContext]);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-card border border-border p-6">
      {/* 3D Canvas or Mobile Fallback */}
      <div className="aspect-square w-full max-w-[400px] mx-auto mb-6">
        {isMobile ? (
          <MobileFallback
            coverArt={coverArt}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
          />
        ) : (
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Canvas camera={{ position: [0, 4, 5], fov: 50 }}>
              <Scene
                analyser={analyserRef.current}
                isPlaying={isPlaying}
                coverArt={coverArt}
              />
            </Canvas>
          </Suspense>
        )}
      </div>

      {/* Track Info */}
      <div className="text-center mb-4">
        <h4 className="font-display text-lg font-bold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="w-full"
        />
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        {/* Volume */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Volume2 className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-20"
          />
        </div>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-gradient-cta flex items-center justify-center hover:opacity-90 transition-opacity shadow-glow-blue"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-primary-foreground" />
          ) : (
            <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
          )}
        </button>

        {/* Spacer for symmetry */}
        <div className="w-[100px]" />
      </div>
    </div>
  );
}
