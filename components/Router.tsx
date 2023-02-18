import {Circle, Node, NodeProps, Rect, Text} from '@motion-canvas/2d/lib/components';
import {colorSignal, initial, signal} from '@motion-canvas/2d/lib/decorators';
import {
    createSignal,
    SignalValue,
    SimpleSignal,
  } from '@motion-canvas/core/lib/signals';
import {all, loop, any, sequence, delay, chain} from '@motion-canvas/core/lib/flow';
import { WiFi } from './WiFi';
import { createRef, Reference } from '@motion-canvas/core/lib/utils';
export interface RouterProps extends NodeProps {
    // x?: SignalValue<number>;
    // y?: SignalValue<number>;
    // opacity?: SignalValue<number>;
    isAnimating?:SignalValue<boolean>;
}    

export class Router extends Node { 
    @initial(false)
    @signal()
    public declare readonly isAnimating: SimpleSignal<boolean, this>;

    private declare wifiRef:Reference<WiFi>;
    private declare titleTextOpacity: SimpleSignal<number,this>;
    public constructor(props?: RouterProps) {
        super({
            ...props,
        });
        this.wifiRef = createRef<WiFi>();
        this.titleTextOpacity = createSignal(0);
        this.add(
            <Rect>
                <Text
                    x = {0}
                    y = {-160}
                    fill="#ffffff"
                    fontFamily={'IntelOne Display Regular'}
                    text="Access Point"
                    opacity={this.titleTextOpacity}
                />
                <Rect
                    x={-70}
                    y={-50}
                    width={15}
                    height={125}
                    fill="#ffffff"
                    radius={5}
                    rotation={-30}
                />
                <Rect
                    x={70}
                    y={-50}
                    width={15}
                    height={125}
                    fill="#ffffff"
                    radius={5}
                    rotation={30}
                />
                <Rect
                    width={200}
                    height={70}
                    fill="#ffffff"
                    radius={10}
                />
                <Rect
                    width={180}
                    height={50}
                    fill="#444444"
                    radius={10}
                />
                <WiFi
                    y={-60}
                    ref={this.wifiRef}
                />
            </Rect>
        );
    }

    public *animateTitle(){
        yield* chain(
            this.titleTextOpacity(100,1),
            //this.subTitleTextOpacity(100,1),
        );
    }

    public *animate(iterations:number=1){
        yield* all(
                this.wifiRef().animate(iterations),
        );
    }
}