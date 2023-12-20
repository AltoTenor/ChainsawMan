import { Environment, OrbitControls, PerspectiveCamera, SpotLight, SpotLightShadow, useScroll, useTexture } from '@react-three/drei';
import gsap from 'gsap';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import Devilcomp from './Devilcomp'
import Astronauts from './Astronauts'
import SpookyMusic from './assets/music/spook.mp3'
import SpotLightSound from './assets/music/sp2.mp3'
import GrowlSound from './assets/music/growl1.mp3'



function makeSpotlight(p,t,givenRef){
    const [o] = useState(() => new THREE.Object3D())
    return(
        <group>
            <spotLight args={[
                "#000",  //Color
                300,     //Intensity
                100,    //distance
                Math.PI/4.8, //Angle
                0.3,       //Penumbra
            ]}
            position={p}
            target={o}
            castShadow
            ref={givenRef}
            />
            <primitive object={o} position={t} />
        </group>
    )
}



const Three = () => {


    // Textures

    const [ colorMap , displacementMap , normalMap , roughnessMap, aoMap ] = useTexture ( [ 
        './MoonText/Moon_001_COLOR.jpg',
        './MoonText/Moon_001_DISP.png',
        './MoonText/Moon_001_NORM.jpg',
        './MoonText/Moon_001_SPEC.jpg',
        './MoonText/Moon_001_OCC.jpg',
    ])

    const texts = [colorMap, displacementMap , normalMap , roughnessMap, aoMap  ];
    texts.forEach( (x) => {
        x.wrapT = THREE.RepeatWrapping;
        x.wrapS = THREE.RepeatWrapping;
        x.repeat.set( 4, 6 );
    })

    //References

    const CameraRef = useRef(null);
    const sp1Ref = useRef(null);
    const sp2Ref = useRef(null);
    const sp3Ref = useRef(null);
    const sp4Ref = useRef(null);
    const sp5Ref = useRef(null);
    var TL = useRef(null);

    //Animation

    TL = gsap.timeline();
    const SLS = new Audio(SpotLightSound);
    const SM = new Audio(SpookyMusic);
    const GS = new Audio(GrowlSound);
    SLS.volume = 0.2;
    SM.volume = 0.5;
    GS.volume = 0.1;

    useEffect( ()=>{
        
        const lights = [sp1Ref,sp2Ref,sp3Ref,sp4Ref,,sp5Ref];

        TL.to(
            CameraRef.current.position,
            {
                duration:0,
                onComplete:(()=>{SM.play();})
            }
        )
        lights.forEach( (lt)=>{
            TL.to(
                CameraRef.current.position,
                {
                    duration:1.5,
                }
            )
            TL.to(
                lt.current,
                {
                    duration:0,
                    color: new THREE.Color(0xffffff),
                    onComplete: (lt == sp5Ref?()=>{SLS.play();GS.play();TL.pause();}:()=>{SLS.play();})
                }
            )
        })
        TL.to(
            CameraRef.current.position,
            {
                duration:4,
                ease:"power2.in",
                z:-30,
                onComplete: ( ()=>{window.location.href = 'https://thankyoucsmpage.web.app';} )
            }
        )
    },[])


    

    return (
        <>
            <PerspectiveCamera makeDefault position={[0,10,44]} rotation={[-Math.PI/24,0,0]} ref={CameraRef} />
            {/* <OrbitControls/> */}
            {/* <axesHelper args={[15]} /> */}

            {/* Models */}

            <Devilcomp scale={0.2} position={[.3,9.6,-26]} castShadow onClick={(e)=>{TL.resume()}}/>
            <Astronauts scale={0.3} rotation={[0,Math.PI/2,0]} position={[3,2.8,21]} castShadow onClick={()=>{TL.resume()}}/>

            {/* Plane */}
            <mesh rotation={[Math.PI/2,0,0]} receiveShadow>
                <planeGeometry args={[40,65,200,200]}/>
                <meshStandardMaterial 
                    side={THREE.DoubleSide} 
                    displacementScale={0.2}
                    map = {colorMap}
                    displacementMap = {displacementMap}
                    normalMap = {normalMap}
                    roughnessMap = {roughnessMap}
                    aoMap = {aoMap}
                />
            </mesh>

            {/* Lighting */}
            {/* <ambientLight color="#ffffff" intensity='.2'/> */}
            {makeSpotlight([-12,12,21],[-1,0,21],sp1Ref)}
            {makeSpotlight([-12,12,9],[-1,0,9],sp2Ref)}
            {makeSpotlight([-12,12,-3],[-1,0,-3],sp3Ref)}
            {makeSpotlight([-12,12,-15],[-1,0,-15],sp4Ref)}
            {makeSpotlight([.3,22,-23],[.3,9.6,-28],sp5Ref)}

            {/* Environment */}
            <Environment background>
                <mesh>
                    <sphereGeometry args={[50,100,100]}/>
                    <meshBasicMaterial color="#300" side = {THREE.DoubleSide} />
                </mesh>
            </Environment>
        </>
    )
}

export default Three;