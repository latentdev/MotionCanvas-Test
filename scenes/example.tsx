import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Rect, Circle, Text} from '@motion-canvas/2d/lib/components'
import {createRef} from '@motion-canvas/core/lib/utils';
import {all, loop} from '@motion-canvas/core/lib/flow';
import {tween, map} from '@motion-canvas/core/lib/tweening';
import { createSignal } from '@motion-canvas/core/lib/signals';

export default makeScene2D(function* (view) {
  const activeSquareRef = createRef<Rect>();
  const indicatorLight = createRef<Circle>();
  //const myCircle = createRef<Circle>();
  const activeSquareTransformX = createSignal(0);
  const activeSquareTransformY= createSignal(0);
  const opacity = createSignal(0);
  let yMax = 30;
  //PC
  view.add(
    <Rect>

      <Rect
      //Stand
      x={0}
      y={15}
      width={90}
      height={180}
      fill="#ffffff"
      radius={10}/>

      <Rect
      //Frame
      width={240}
      height={150}
      fill="#ffffff"
      radius={10}/>

      <Rect
      //Screen
      width={220}
      height={130}
      fill="#444444"
      radius={10}>
      </Rect>

      <Rect
        //Active Square
        ref={activeSquareRef}
        x = {activeSquareTransformX}
        y = {activeSquareTransformY}
        width={30}
        height={30}
        fill="#17d4fc"
        radius={5}
      />

      <Rect
      //PC Case
      x={180}
      y={10}
      width={90}
      height={190}
      fill="#ffffff"
      radius={10}/>

      <Rect
      x={180}
      y={-70}
      height={20}
      width={75}
      fill="#333333"
      radius={7}/>

      <Rect
      x={180}
      y={-51}
      height={10}
      width={75}
      fill="#333333"
      radius={5}/>

      <Rect
      x={180}
      y={-39}
      height={10}
      width={75}
      fill="#333333"
      radius={10}/>

      <Rect
      x={180}
      y={-27}
      height={10}
      width={75}
      fill="#333333"
      radius={5}/>

      <Rect
      x={180}
      y={-15}
      height={10}
      width={75}
      fill="#333333"
      radius={10}/>

      <Rect
      x={180}
      y={-2}
      height={10}
      width={75}
      fill="#333333"
      radius={5}/>

      <Rect
      x={180}
      y={53}
      height={95}
      width={80}
      fill="#333333"
      radius={10}/>

      <Circle
      ref={indicatorLight}
      x={205}
      y={20}
      width={10}
      height={10}
      fill="#17d4fc"/>

    </Rect>
  );

  yield* all(
    loop(99,i => activeSquareTransformX(-70,0).to(70,1).to(-70,1).to(70,1).to(-70,1)),
    loop(99,i => activeSquareTransformY(30,0).to(getRandomInt(30),1).to(getRandomInt(30),1).to(getRandomInt(30),1).to(30,1))
    //myCircle().position.x(300, 1).to(-300, 1),
    //myCircle().fill('#e6a700', 1).to('#e13238', 1),
  );

  function getRandomInt(max:number) {
    let isNegative = Math.random()>.5?true:false;
    if (isNegative)
    {
      max=max*-1;
    }
    return Math.floor(Math.random() * max);
  }
});


