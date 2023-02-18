import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { Rect, Line, Text } from '@motion-canvas/2d/lib/components';
import { createSignal } from '@motion-canvas/core/lib/signals';
import { createRef } from '@motion-canvas/core/lib/utils';
import { GamingPC } from '../components/GamingPC';
import { Router } from '../components/Router';
import { Laptop } from '../components/Laptop';
import {all, loop, sequence, any, chain} from '@motion-canvas/core/lib/flow';
import { Vector2 } from '@motion-canvas/core/lib/types';
import { vector2Signal } from '@motion-canvas/2d/lib/decorators';
export default makeScene2D(function* (view) {
    const scale = 2;
    const gamingPCRef = createRef<GamingPC>();
    const gamingPCX = createSignal(0);
    const gamingPCY = createSignal(0);
    const gamingPCOpacity = createSignal(0);

    const routerRef = createRef<Router>();
    const routerX = createSignal(0);
    const routerY = createSignal(0);
    const routerOpacity = createSignal(0);

    const laptopRef = createRef<Laptop>();
    const laptopX = createSignal(0);
    const laptopY = createSignal(0);
    const laptopOpacity = createSignal(0);

    const ethernetRef = createRef<Line>();
    const ethernetVector1 = Vector2.createSignal(()=>new Vector2(gamingPCX(),gamingPCY()+200))
    const ethernetVector2 = Vector2.createSignal(()=>new Vector2(gamingPCX(),gamingPCY()+200))
    
    const wifiRef = createRef<Line>();
    const wifiVector1 = Vector2.createSignal(()=>new Vector2(routerX()-150,routerY()))
    const wifiVector2 = Vector2.createSignal(()=>new Vector2(routerX()-150,routerY()))

    const ethernetTextOpacity = createSignal(0);
    const wifiTextOpacity = createSignal(0);

    view.add(
        <Rect>
            <Router
                ref={routerRef}
                scale={scale}
                x={()=>routerX()*scale}
                y={()=>routerY()*scale}
                opacity={routerOpacity}
            />
            <GamingPC 
                ref={gamingPCRef}
                scale={scale}
                x={()=>gamingPCX()*scale}
                y={()=>gamingPCY()*scale}
                opacity={gamingPCOpacity}
            />
            <Laptop
                ref={laptopRef}
                scale={scale}
                x={()=>laptopX()*scale}
                y={()=>laptopY()*scale}
                opacity={laptopOpacity}
            />
            <Line
                ref={ethernetRef}
                scale={scale}
                points={[()=>ethernetVector1(), ()=>ethernetVector2()]}
                startArrow
                endArrow
                stroke={'#ffffff'}
                lineWidth={10}
            />
            <Line
                ref={wifiRef}
                scale={scale}
                points={[()=>wifiVector1(), ()=>wifiVector2()]}
                startArrow
                endArrow
                lineDash={[20*scale, 20*scale]}
                stroke={'#ffffff'}
                lineWidth={10}
            />
            <Text
                scale={scale}
                x={240*scale}
                y={50*scale}
                text="Ethernet"
                fontFamily={'IntelOne Display Regular'}
                fill="#ffffff"
                opacity={ethernetTextOpacity}
            />
            <Text
                scale={scale}
                x={-240*scale}
                y={50*scale}
                text="Wi-Fi"
                fontFamily={'IntelOne Display Regular'}
                fill="#ffffff"
                opacity={wifiTextOpacity}
            />

        </Rect>
    );

    yield* all(
        gamingPCRef().animate(999),
        routerRef().animate(999),
        laptopRef().animate(999),
        //loop(999, ethernetVector1()),
        //loop(999, i => ethernetVector2(routerX(),routerY())),
        chain(
            chain(
                gamingPCOpacity(100,1),
                gamingPCRef().animateTitle(),
                all(
                    gamingPCX(500,2),
                    gamingPCY(-300,2)    
                )
            ),
            chain(
                routerOpacity(100,1),
                routerRef().animateTitle(),
                all(
                    routerX(500,2),
                    routerY(350,2)    
                )
            ),
            chain(
                laptopOpacity(100,1),
                laptopRef().animateTitle(),
                all(
                    laptopX(-500,2),
                    laptopY(-300,2), 
                    routerX(0,2),
                    routerY(350,2),   
                )
            ),
            chain(
                //ethernetVector1(()=>new Vector2(gamingPCX(),gamingPCY()+200),0),
                ethernetVector2(()=>new Vector2(routerX()+150,routerY()),2),
                ethernetTextOpacity(100,1.5),
                wifiVector2(()=>new Vector2(laptopX(),laptopY()+200),2),
                wifiTextOpacity(100,1.5)
            )
        ),
    );
});