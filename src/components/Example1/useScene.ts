import { Body, Box, Plane, Vec3, World } from "cannon-es";
import { useEffect, useRef } from "react";
import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

const CUBE_SIZE = 1;

export const useScene = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let width: undefined | number;
    let height: undefined | number;

    // Создаем физический мир
    const world = new World();
    world.gravity.set(0, -9.82, 0); // Устанавливаем гравитацию

    // Создаем физическую землю
    const groundShape = new Plane();
    const groundBody = new Body({
      mass: 0, // Масса 0 делает тело статичным
    });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Поворачиваем плоскость
    world.addBody(groundBody);

    // Создаем физический куб
    const cubeShape = new Box(
      new Vec3(CUBE_SIZE / 2, CUBE_SIZE / 2, CUBE_SIZE / 2),
    );
    const cubeBody = new Body({
      mass: 2, // Масса куба
    });
    cubeBody.addShape(cubeShape);
    cubeBody.position.set(0, 5, 0); // Начальная позиция куба
    cubeBody.quaternion.setFromEuler(Math.PI / 4, Math.PI / 4, 0); // Поворот на 45 градусов вокруг оси Y
    world.addBody(cubeBody);

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xdddddd, 1);
    root.appendChild(renderer.domElement);

    const scene = new Scene();

    const camera = new PerspectiveCamera();
    camera.position.z = 50;
    scene.add(camera);

    // Создаём геометрический куб
    const boxGeometry = new BoxGeometry(10, 10, 10);
    const basicMaterial = new MeshBasicMaterial({ color: 0x0095dd });
    const cube = new Mesh(boxGeometry, basicMaterial);
    scene.add(cube);
    cube.rotation.set(0.4, 0.2, 0);

    // Добавляем освещение
    const ambientLight = new AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

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
      // Обновляем физический мир
      world.step(1 / 60); // Шаг физики

      // Синхронизируем позиции и вращения объектов Three.js с физическими телами Cannon.js
      cube.position.copy(cubeBody.position);
      cube.quaternion.copy(cubeBody.quaternion);

      renderer.render(scene, camera);
      handleResize();
      requestAnimationFrame(render);
    }

    render();
  }, []);

  return ref;
};
