import {makeProject} from '@motion-canvas/core/lib';
import Diagram from './scenes/Diagram?scene';
import Results from './scenes/Results?scene';

import './global.css'
import { Vector2 } from '@motion-canvas/core/lib/types';
import Test from './scenes/Test?scene';

//import example from './scenes/GamingPC?scene';

export default makeProject({
  scenes: [Test],//[Diagram, Results],
  background: '#141414',
  size: new Vector2(3840,2160)
});
