import {Circle, Node, NodeProps, Rect, Text, Line} from '@motion-canvas/2d/lib/components';
import {colorSignal, initial, signal} from '@motion-canvas/2d/lib/decorators';
import { createSignal, SignalValue, SimpleSignal, } from '@motion-canvas/core/lib/signals';
import {all, loop, sequence, any, delay} from '@motion-canvas/core/lib/flow';
import { Vector2 } from '@motion-canvas/core/lib/types';
import {useRandom} from '@motion-canvas/core/lib/utils';
import { Random } from '@motion-canvas/core/lib/scenes';

export interface ActivityProps extends NodeProps {
    isAnimating?:SignalValue<boolean>;
}    

export class Activity extends Node { 
    @initial(false)
    @signal()
    public declare readonly isAnimating: SimpleSignal<boolean, this>;

    private declare activeSquareTransformX: SimpleSignal<number,this>;
    private declare activeSquareTransformY: SimpleSignal<number,this>;
    private declare random: Random;
    public constructor(props?: ActivityProps) {
        super({
            ...props,
        });

        this.random = useRandom()
        this.activeSquareTransformX = createSignal(0);
        this.activeSquareTransformY = createSignal(0);

        this.add(
            <Rect>
                <Rect
                    //Active Square
                    x = {this.activeSquareTransformX}
                    y = {this.activeSquareTransformY}
                    width={30}
                    height={30}
                    fill="#17d4fc"
                    radius={5}
                />
            </Rect>
        )

    }

    public *animate(iterations:number=1){
        yield* all(
            loop(iterations, i => this.activeSquareTransformX(-70,0).to(70,1).to(-70,1).to(70,1).to(-70,1)),
            loop(iterations, i => this.activeSquareTransformY(30,0).to(30,1).to(-30,1).to(-30,1).to(30,1)),
        );
    }

    private getRandomInt(max:number) {
        let isNegative = Math.random()>.5?true:false;
        if (isNegative)
        {
        max=max*-1;
        }
        return Math.floor(Math.random() * max);
    }
}
