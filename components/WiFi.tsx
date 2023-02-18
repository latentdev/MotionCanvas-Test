import {Circle, Node, NodeProps, Rect, Text, Line} from '@motion-canvas/2d/lib/components';
import {colorSignal, initial, signal} from '@motion-canvas/2d/lib/decorators';
import {
    createSignal,
    SignalValue,
    SimpleSignal,
  } from '@motion-canvas/core/lib/signals';
import {all, loop, sequence, chain} from '@motion-canvas/core/lib/flow';
import { Vector2 } from '@motion-canvas/core/lib/types';
export interface WiFiProps extends NodeProps {

}    

export class WiFi extends Node { 

    private declare signalCircle: SimpleSignal<number,this>;
    private declare signalBar1: SimpleSignal<number,this>;
    private declare signalBar2: SimpleSignal<number,this>;
    private declare signalBar3: SimpleSignal<number,this>;
    public constructor(props?: WiFiProps) {
        super({
            ...props,
        });

        this.signalCircle = createSignal(0);
        this.signalBar1 = createSignal(0);
        this.signalBar2 = createSignal(0);
        this.signalBar3 = createSignal(0);

        this.add(
            
            <Rect>
                <Line
                    y={-45}
                    points={[new Vector2(-50,0),new Vector2(0,-40),new Vector2(50,0)]}
                    lineWidth={10}
                    stroke={'#17d4fc'}
                    radius={450}
                    opacity={this.signalBar3}
                />
                <Line
                    y={-30}
                    points={[new Vector2(-40,0),new Vector2(0,-35),new Vector2(40,0)]}
                    lineWidth={10}
                    stroke={'#17d4fc'}
                    radius={450}
                    opacity={this.signalBar2}
                />
                <Line
                    y={-15}
                    points={[new Vector2(-30,0),new Vector2(0,-30),new Vector2(30,0)]}
                    lineWidth={10}
                    stroke={'#17d4fc'}
                    radius={450}
                    opacity={this.signalBar1}
                />
                <Circle
                    y={0}
                    width={25}
                    height={25}
                    fill="#17d4fc"
                    opacity={this.signalCircle}
                />
            </Rect>
        );
    }

    public *animate(iterations:number=1){
        yield* loop(iterations,
            i=> chain(
                    chain(
                        this.signalCircle(100,0.5),
                        this.signalBar1(100,0.5),
                        this.signalBar2(100,0.5),
                        this.signalBar3(100,0.5),
                    ),
                    all(
                        //this.signalCircle(0,0),
                        this.signalBar1(0,0),
                        this.signalBar2(0,0),
                        this.signalBar3(0,0),
                    ),
        ));
    }
}