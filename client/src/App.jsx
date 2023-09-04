import Canvas from './canvas';
import Customiser from './pages/Customiser';
import Home from './pages/Home';
function App(){
  return (////The main component is one that will be rendered by the ReactDOM.render() method.
    <main className='app transition-all ease-in'>
      <Home />
      <Canvas />
      <Customiser />
    </main>)

}
export default App;