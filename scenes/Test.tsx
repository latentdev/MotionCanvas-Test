import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Layout, Rect, Text} from '@motion-canvas/2d/lib/components';
import {createRef, makeRef, range, useRandom} from '@motion-canvas/core/lib/utils';
import {all, chain, loop, sequence} from '@motion-canvas/core/lib/flow';
import { Bar } from '../components/Bar';
import { createSignal } from '@motion-canvas/core/lib/signals';

export default makeScene2D(function* (view) {
  // const random = useRandom();
  // const rects: Rect[] = [];
  const barRef = createRef<Bar>();
  var scoreColor = createSignal("#78bc61");
  view.add(
      <Bar
      ref={barRef}
      //x={i*(barWidth+gap)}
      color={scoreColor}
      value={8.6}
      max={10}
      barWidth={80}
      barHeight={400}
      label={"Test"}
      darkFont={false}
    /> 
    // <Layout direction={'column'} gap={20} layout>
    //   <Layout gap={20} layout>
    //     <Rect
    //       height={100}
    //       width={200}
    //       fill={"#ffffff"}>
    //       <Text
    //         //x={-10}
    //         //y={30}
    //         text={"Test"}
    //         fontFamily={'IntelOne Display Regular'}
    //         fill='#444444'
    //       />
    //     </Rect>
    //     <Rect
    //       height={100}
    //       width={200}
    //       fill={"#ffffff"}
    //     />
    //   </Layout>
    //   <Layout gap={20} layout>
    //     <Rect
    //       height={100}
    //       width={200}
    //       fill={"#444444"}
    //     />
    //     <Rect
    //       height={100}
    //       width={200}
    //       fill={"#444444"}
    //     />

    //   </Layout>
    // </Layout>
  );

  yield* all(
      //barRef().animate(),
      // chain(
      //   scoreColor('#b2aa8e',0.5),
      //   scoreColor('#0c1b33',0.5),
      //   scoreColor('#7a306c',0.5),
      //   scoreColor('#03b5aa',0.5),
      //   scoreColor('#dbfe87',0.5),
      // )
  )
    // <Layout layout gap={10} alignItems="center">
    //   {range(40).map(i => (
    //     <Rect
    //       ref={makeRef(rects, i)}
    //       radius={5}
    //       width={10}
    //       height={10}
    //       fill={'#e13238'}
    //     />
    //   ))}
    // </Layout>,
  //);
  // console.log(`rects: ${rects.length}`);
  // yield* loop(3, () =>
  //   sequence(
  //     0.04,
  //     ...rects.map(rect =>
  //       all(
  //         rect.size.y(random.nextInt(100, 200), 0.5).to(10, 0.5),
  //         rect.fill('#e6a700', 0.5).to('#e13238', 0.5),
  //       ),
  //     ),
  //   ),
  // );
});