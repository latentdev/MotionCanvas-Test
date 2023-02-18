import {Circle, Node, NodeProps, Rect, Text} from '@motion-canvas/2d/lib/components';
import {colorSignal, initial, signal} from '@motion-canvas/2d/lib/decorators';
import { Activity } from './Activity';
import {
    createSignal,
    SignalValue,
    SimpleSignal,
  } from '@motion-canvas/core/lib/signals';
import {all, loop, sequence, any, chain} from '@motion-canvas/core/lib/flow';
import {createRef, Reference } from '@motion-canvas/core/lib/utils';
export interface GamingPCProps extends NodeProps {
    x?: SignalValue<number>;
    y?: SignalValue<number>;
    opacity?: SignalValue<number>;
    isAnimating?:SignalValue<boolean>;
}    

export class GamingPC extends Node { 
    @initial(false)
    @signal()
    public declare readonly isAnimating: SimpleSignal<boolean, this>;

    private declare activityRef:Reference<Activity>;
    private declare indicatorOpacity: SimpleSignal<number,this>;
    private declare titleTextOpacity: SimpleSignal<number,this>;
    private declare subTitleTextOpacity: SimpleSignal<number,this>;

    public constructor(props?: GamingPCProps) {
        super({
            ...props,
        });

        this.activityRef = createRef<Activity>();
        this.indicatorOpacity = createSignal(0);
        this.titleTextOpacity = createSignal(0);
        this.subTitleTextOpacity = createSignal(0);

        this.add(
            <Rect>
                <Text
                    x = {50}
                    y = {-120}
                    fill="#ffffff"
                    fontFamily={'IntelOne Display Regular'}
                    text="Gaming PC"
                    opacity={this.titleTextOpacity}
                />
                <Text
                    x = {50}
                    y = {150}
                    fill="#ffffff"
                    fontFamily={'IntelOne Display Regular'}
                    text="Running a 4k game locally"
                    opacity={this.subTitleTextOpacity}
                />
                <Rect
                    //Stand
                    x={0}
                    y={15}
                    width={90}
                    height={180}
                    fill="#ffffff"
                    radius={10}
                />
                <Rect
                    //Frame
                    width={240}
                    height={150}
                    fill="#ffffff"
                    radius={10}
                />
    
                <Rect
                    //Screen
                    width={220}
                    height={130}
                    fill="#444444"
                    radius={10}
                />
    
                <Activity
                    ref={this.activityRef}
                />
    
                <Rect
                    //PC Case
                    x={180}
                    y={10}
                    width={90}
                    height={190}
                    fill="#ffffff"
                    radius={10}
                />
    
                <Rect
                    x={180}
                    y={-70}
                    height={20}
                    width={75}
                    fill="#333333"
                    radius={7}
                />
    
                <Rect
                    x={180}
                    y={-51}
                    height={10}
                    width={75}
                    fill="#333333"
                    radius={5}
                />

                <Rect
                    x={180}
                    y={-39}
                    height={10}
                    width={75}
                    fill="#333333"
                    radius={10}
                />
    
                <Rect
                    x={180}
                    y={-27}
                    height={10}
                    width={75}
                    fill="#333333"
                    radius={5}
                />
            
                <Rect
                    x={180}
                    y={-15}
                    height={10}
                    width={75}
                    fill="#333333"
                    radius={10}
                />
            
                <Rect
                    x={180}
                    y={-2}
                    height={10}
                    width={75}
                    fill="#333333"
                    radius={5}
                />
            
                <Rect
                    x={180}
                    y={53}
                    height={95}
                    width={80}
                    fill="#333333"
                    radius={10}
                />
            
                <Circle
                    x={205}
                    y={20}
                    width={10}
                    height={10}
                    fill="#444444"
                />
            
                <Circle
                    x={205}
                    y={20}
                    width={10}
                    height={10}
                    fill="#17d4fc"
                    opacity={this.indicatorOpacity}
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
            this.activityRef().animate(iterations),
            loop(iterations, i=> this.indicatorOpacity(100,0.5).to(0,1)),

        );
    }
}