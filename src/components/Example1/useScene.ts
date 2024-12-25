import { useEffect, useRef } from "react";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
export const useScene = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let width: undefined | number;
    let height: undefined | number;

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xdddddd, 1);
    root.appendChild(renderer.domElement);

    const scene = new Scene();

    const camera = new PerspectiveCamera();
    camera.position.z = 50;
    scene.add(camera);

    const boxGeometry = new BoxGeometry(10, 10, 10);
    const basicMaterial = new MeshBasicMaterial({ color: 0x0095dd });
    const cube = new Mesh(boxGeometry, basicMaterial);
    scene.add(cube);
    cube.rotation.set(0.4, 0.2, 0);

    const handleResize = () => {
      const { clientWidth, clientHeight } = root;
      // Если размеры не изменились - завершаем функцию.
      if (clientWidth === width && clientHeight === height) {
        return;
      }
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    function render() {
      renderer.render(scene, camera);
      handleResize();
      requestAnimationFrame(render);
    }

    render();
  }, []);

  return ref;
};
