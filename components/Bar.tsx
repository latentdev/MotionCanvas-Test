import {Circle, Node, NodeProps, Rect, Text, Line} from '@motion-canvas/2d/lib/components';
import {colorSignal, initial, signal} from '@motion-canvas/2d/lib/decorators';
import {
    createSignal,
    SignalValue,
    SimpleSignal,
  } from '@motion-canvas/core/lib/signals';
import {all, loop, sequence, chain} from '@motion-canvas/core/lib/flow';

export interface BarProps extends NodeProps {
    value?:SignalValue<number>;
    label?:SignalValue<string>;
    max?:SignalValue<number>;
    barWidth?:SignalValue<number>;
    barHeight?:SignalValue<number>;
    color?:SignalValue<string>;
    darkFont?:SignalValue<boolean>;
}    

export class Bar extends Node { 
    @initial(1)
    @signal()
    public declare readonly value: SimpleSignal<number, this>;

    @initial("x")
    @signal()
    public declare readonly label: SimpleSignal<string,this>;

    @initial(1)
    @signal()
    public declare readonly max: SimpleSignal<number, this>;

    @initial(50)
    @signal()
    public declare readonly barWidth: SimpleSignal<number,this>;

    @initial(50)
    @signal()
    public declare readonly barHeight: SimpleSignal<number,this>;

    @initial('#ffffff')
    @signal()
    public declare readonly color: SimpleSignal<string, this>;

    @initial(true)
    @signal()
    public declare readonly darkFont: SimpleSignal<boolean, this>;

    private declare currentDisplayValue: SimpleSignal<number,this>;
    private declare currentHeightValue: SimpleSignal<number,this>;
    private declare barHeightFactor: number;

    public constructor(props?: BarProps) {
        super({
            ...props,
        });

        this.currentDisplayValue = createSignal(0);
        this.currentHeightValue = createSignal(0);

        this.barHeightFactor = this.barHeight()/this.max();

        this.add(
            <Rect>
                <Rect
                    height={this.barHeight()}
                    width={this.barWidth()}
                    fill={"#333333"}
                    offset={[0,1]}
                    radius={10}
                />
                <Rect
                    height={this.currentHeightValue}//()=>this.currentDisplayValue()*this.barHeightFactor}
                    width={this.barWidth()}
                    fill={this.color}
                    offset={[0,1]}
                    radius={10}
                />
                <Text
                    x={-10}
                    y={30}
                    text={this.label}
                    fontFamily={'IntelOne Display Regular'}
                    fill='#ffffff'
                    offset={[-1,0]}
                    rotation={45}
                />
                <Text
                    x={5}
                    y={-20}
                    text={()=>this.currentDisplayValue().toFixed(2)}
                    fontFamily={'IntelOne Display Regular'}
                    fill={()=>this.darkFont()?"#444444":"#ffffff"}
                    rotation={-90}
                    offset={[-1,0]}
                />
            </Rect>
        );
    }

    public *animate()
    {
        console.log("Beginning Bar animate");
        yield* all(
            this.currentDisplayValue(0,0).to(this.value() , 1),
            this.currentHeightValue(0,0).to(this.value()*this.barHeightFactor , 1)
        )
        console.log("Ending BarGraph animate");
    }

}