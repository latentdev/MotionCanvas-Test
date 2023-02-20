import {Circle, Node, NodeProps, Rect, Text, Line, Layout, Grid} from '@motion-canvas/2d/lib/components';
import {colorSignal, initial, signal} from '@motion-canvas/2d/lib/decorators';
import {
    createSignal,
    SignalValue,
    SimpleSignal,
  } from '@motion-canvas/core/lib/signals';
import {all, loop, sequence, any, delay, chain, run} from '@motion-canvas/core/lib/flow';
import { Vector2 } from '@motion-canvas/core/lib/types';
import {createRef, makeRef, range, Reference } from '@motion-canvas/core/lib/utils';
import { Bar } from './Bar';
import { tween } from '@motion-canvas/core/lib/tweening';

export interface BarGraphProps extends NodeProps {
    values?:SignalValue<[string, number][]>;
    title?:SignalValue<string>;
}    

export class BarGraph extends Node { 
    @initial([])
    @signal()
    public declare readonly values: SimpleSignal<[string, number][], this>;

    @initial("")
    @signal()
    public declare readonly title: SimpleSignal<string, this>;

    private bars:Bar[];
    private scoreColor:SimpleSignal<string,this>;

    public constructor(props?: BarGraphProps) {
        super({
            ...props,
        });

        this.scoreColor = createSignal("#78bc61");
        this.bars = [];
        const barWidth = 80;
        const barHeight = 400;
        const max = 10;
        const gap = barWidth/2;

        this.add(//should do a layout
            <Rect>
                <Text
                    y={(barHeight+60)*-1}
                    text={this.title()}
                    fontFamily={'IntelOne Display Regular'}
                    fill='#ffffff'
                />
                {/* <Grid
                    x={0}
                    y={0}
                    width={(this.values().length)*150}
                    height={(max*scale+2)}
                    spacing={() => scale-10 * 1}
                    stroke={'#444'}
                    lineWidth={2}
                    lineCap="square"
                    cache
                    /> */}
                <Rect
                    fill={"#777777"}
                    x={(this.values().length-1)*(barWidth+gap)/2*-1}
                    spawner={() =>
                        range(this.values().length).map(i=>(
                            <Bar
                                ref={makeRef(this.bars,i)}
                                x={i*(barWidth+gap)}
                                color={this.scoreColor}
                                value={this.values()[i][1]}
                                max={max}
                                barWidth={barWidth}
                                barHeight={barHeight}
                                label={this.values()[i][0]}
                                darkFont={false}
                            />
                        )
                    )}
                />

            </Rect>
        );
    }

    public *animate()
    {
        console.log("Beginning BarGraph animate");
        yield* 
            chain(
                ...this.bars.map((bar,index)=> {
                    console.log(`Animating bar ${index+1}`);
                    return bar.animate();
                }),
            );
        // this.bars.forEach(function(bar){
        //     yield* bar.animate();
        //     console.log(bar);
        // });
        //all(
            // yield* chain(
            //     run(function*(){
                // ...this.bars.map(bar =>
                // {
                //     run(function* (){
                //         console.log("Bar Animate");
                //         bar.animate();
                //     })
                // })
            // }),
            // );
        //);
        console.log("Ending BarGraph animate");
    }
}