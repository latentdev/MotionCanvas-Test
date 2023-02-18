import {Circle, Node, NodeProps, Rect, Text, Line} from '@motion-canvas/2d/lib/components';
import {colorSignal, initial, signal} from '@motion-canvas/2d/lib/decorators';
import {
    createSignal,
    SignalValue,
    SimpleSignal,
  } from '@motion-canvas/core/lib/signals';
import {all, loop, sequence, any, delay, chain} from '@motion-canvas/core/lib/flow';
import { Vector2 } from '@motion-canvas/core/lib/types';
import { Activity } from './Activity';
import {createRef, Reference } from '@motion-canvas/core/lib/utils';
export interface LaptopProps extends NodeProps {
    isAnimating?:SignalValue<boolean>;
}    

export class Laptop extends Node { 
    @initial(false)
    @signal()
    public declare readonly isAnimating: SimpleSignal<boolean, this>;

    private declare activityRef:Reference<Activity>;
    private declare titleTextOpacity: SimpleSignal<number,this>;
    private declare subTitleTextOpacity: SimpleSignal<number,this>;
    public constructor(props?: LaptopProps) {
        super({
            ...props,
        });

        this.activityRef = createRef<Activity>();
        this.titleTextOpacity = createSignal(0);
        this.subTitleTextOpacity = createSignal(0);


        this.add(
            <Rect>
                <Text
                    x = {0}
                    y = {-120}
                    fill="#ffffff"
                    fontFamily={'IntelOne Display Regular'}
                    text="Device Under Test"
                    opacity={this.titleTextOpacity}
                />
                <Text
                    x = {0}
                    y = {150}
                    fill="#ffffff"
                    fontFamily={'IntelOne Display Regular'}
                    text="Streaming a 4k game remotely"
                    opacity={this.subTitleTextOpacity}
                />
                <Rect
                    width={240}
                    height={150}
                    fill="#ffffff"
                    radius={10}
                />
                <Rect
                    width={220}
                    height={130}
                    fill="#444444"
                    radius={10}
                />
                <Rect
                    y={80}
                    width={260}
                    height={20}
                    fill="#ffffff"
                    radius={5}
                />
                <Rect
                    y={90}
                    width={260}
                    height={10}
                    fill="#dddddd"
                    radius={5}
                />
                <Activity
                    ref={this.activityRef}
                />
            </Rect>
        );
    }

    public *animateTitle(){
        yield* chain(
            this.titleTextOpacity(100,1),
            this.subTitleTextOpacity(100,1),
        );
    }

    public *animate(iterations:number=1){
        yield* all(
            this.activityRef().animate(999),
        );
    }
}