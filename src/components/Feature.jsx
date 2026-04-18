import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/Studiolight.jsx";
import { features, featureSequence } from "../../constants/index.js";
import clsx from "clsx";
import { Suspense, useEffect, useRef, useTransition } from "react";
import { Html, PresentationControls } from "@react-three/drei";
import MacbookModel from "./models/Macbook.jsx";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store/index.js";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';


const ModelScroll = () => {
    const groupRef = useRef(null);
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const { setTexture } = useMacbookStore();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        featureSequence.forEach((item) => {
            const video = document.createElement('video');
            Object.assign(video, {
                src: item.video,
                muted: true,
                playsInline: true,
                preload: "auto",
                crossOrigin: "anonymous",
            })
            video.load();
        });
    }, []);

    useGSAP(() => {
        const modeltl = gsap.timeline({
            scrollTrigger: {
                trigger: "#f-canvas",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true,
            }
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#f-canvas",
                start: "top center",
                end: "bottom top",
                scrub: 1,
            }
        })

        if (groupRef.current) {
            modeltl.to(groupRef.current.rotation, {
                y: Math.PI * 2,
                ease: 'power1.inOut'
            })
        }

        const updateTexture = (url) => {
            startTransition(() => {
                setTexture(url);
            });
        };

        tl.call(() => updateTexture('/videos/feature-1.mp4'))
            .to('.box1', { opacity: 1, y: 0, delay: 1 })

        tl.call(() => updateTexture('/videos/feature-2.mp4'))
            .to('.box2', { opacity: 1, y: 0, delay: 1 })

        tl.call(() => updateTexture('/videos/feature-3.mp4'))
            .to('.box3', { opacity: 1, y: 0, delay: 1 })

        tl.call(() => updateTexture('/videos/feature-4.mp4'))
            .to('.box4', { opacity: 1, y: 0, delay: 1 })

        tl.call(() => updateTexture('/videos/feature-5.mp4'))
            .to('.box5', { opacity: 1, y: 0, delay: 1 })

    }, []);

    return (
        <group ref={groupRef}>
            <MacbookModel scale={isMobile ? 0.06 : 0.08} position={[0, -1, 0]} />
        </group>
    )
}

const Feature = () => {
    return (
        <section id="features">
            <h2>See it all in a new light. </h2>
            <Canvas camera={{}} id='f-canvas'>
                <StudioLights />
                <ambientLight intensity={0.5} />
                <Suspense fallback={<Html center><h1 className='text-white text-3xl uppercase whitespace-nowrap'>Loading Model...</h1></Html>}>
                    <ModelScroll />
                </Suspense>
            </Canvas>

            <div className="absolute inset-0">
                {features.map((feature, index) => (
                    <div key={index} className={clsx('box', `box${index + 1}`, feature.styles)}>
                        <img src={feature.icon} alt={feature.highlight} />
                        <p>
                            <span className="text-white">{feature.highlight}</span>
                            {feature.text}
                        </p>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default Feature