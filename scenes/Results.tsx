import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { Rect, Line, Text, Layout } from '@motion-canvas/2d/lib/components';
import { createSignal } from '@motion-canvas/core/lib/signals';
import { createRef } from '@motion-canvas/core/lib/utils';
import {all, loop, sequence, any, chain, run} from '@motion-canvas/core/lib/flow';
import { BarGraph } from '../components/BarGraph';

export default makeScene2D(function* (view) {
    const scoreRef = createRef<BarGraph>();
    const scoreX = createSignal(0);
    const scoreY = createSignal(0);
    const scoreOpacity = createSignal(100);

    const pingRef = createRef<BarGraph>();
    const pingX = createSignal(0);
    const pingY = createSignal(0);
    const pingOpacity = createSignal(100);
    
    view.add(
        <Layout>
            <BarGraph
                ref={scoreRef}
                x={scoreX}
                y={scoreY}
                values={[["6Ghz", 8.05], ["5Ghz", 7.5], ["2.4Ghz", 2.05], ["Ethernet", 8.6]]}
                title={"Score"}
                opacity={scoreOpacity}
            />
            {/* <BarGraph
                ref={pingRef}
                x={pingX}
                y={pingY}
                values={[["6Ghz", 8.05], ["5Ghz", 7.5], ["2.4Ghz", 2.05], ["Ethernet", 8.6]]}
                title={"Average Ping"}
                opacity={pingOpacity}
            /> */}
        </Layout>
    );

    yield* chain(
        scoreOpacity(0,0).to(100,2),
        // run(function* ()
        // {
        //     console.log("BarGraph Animate");
        //     yield* 
        scoreRef().animate(),
        all(
                scoreX(-500,2),
                scoreY(-100,2)
            ),
        //}),
        
    );
});