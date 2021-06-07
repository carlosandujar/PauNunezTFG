const ViewType = Object.freeze({
  FULL: 0,
  PLANT: 1,
  SELECTION: 2,
  ROUTE_FULL: 3,
  ROUTE_EXTERIOR: 4,
  ROUTE_INTERIOR: 5,
  ROUTE_APSIDIOLE: 6,
});

const BoundingBoxes = [
  {
    id: 0,
    name: "Planta",
    pos: [-0.093, 0.127, 9.381],
    rot: [0.0, 0.0, 0.436],
    siz: [14.783, 11.831, 6.224],
    clip_inside: false,
  },
  {
    id: 1,
    name: "Entrada",
    pos: [1.146, 6.95, 4.856],
    rot: [0.0, 0.0, 0.392],
    siz: [8.916, 6.148, 5.576],
    clip_inside: true,
  },
  {
    id: 2,
    name: "Nau principal",
    pos: [1.543, 0.541, 6.074],
    rot: [0.0, 0.0, 0.444],
    siz: [10.459, 6.232, 6.331],
    clip_inside: true,
  },
  {
    id: 3,
    name: "Nau lateral",
    pos: [3.196, -3.397, 5.33],
    rot: [0.0, 0.0, 0.459],
    siz: [10.431, 3.694, 4.034],
    clip_inside: true,
  },
  {
    id: 4,
    name: "Absis",
    pos: [-4.879, -2.617, 6.254],
    rot: [0.0, 0.0, 0.449],
    siz: [4.479, 4.315, 4.885],
    clip_inside: true,
  },
  {
    id: 5,
    name: "Absidiola nord",
    pos: [-2.167, -6.106, 6.124],
    rot: [0.0, 0.0, 0.426],
    siz: [2.426, 2.327, 3.372],
    clip_inside: true,
  },
  {
    id: 6,
    name: "Absidiola sud",
    pos: [-5.803, 1.739, 4.914],
    rot: [0.009, -0.022, 0.533],
    siz: [2.382, 2.29, 3.895],
    clip_inside: true,
  },
  {
    id: 7,
    name: "Avantsala",
    pos: [-3.621, 3.165, 6.286],
    rot: [0.0, 0.0, 0.531],
    siz: [3.009, 2.695, 6.542],
    clip_inside: true,
  },
];

const Cameras = {
  defaultCam: {
    pos: [-17.112, 11.073, 10.078],
    target: [-2.27, 2.393, 3.923],
  },
  defaultSelection: {
    pos: [-9.513, 5.349, 11.079],
    target: [-8.425, 4.77, 10.264],
  },
  // Vista en planta
  0: {
    pos: [10.441, 4.136, 16.38],
    target: [-0.634, -0.717, 3.914],
  },
  // Entrada
  1: {
    pos: [-1.71, 13.998, 5.759],
    target: [0.279, 9.247, 4.851],
  },
  // Nau principal
  2: {
    pos: [-1.217, 6.872, 12.879],
    target: [0.562, 2.878, 9.051],
  },
  // Nau lateral
  3: {
    pos: [0.517, 2.623, 10.29],
    target: [1.473, 0.638, 9.104],
  },
  // Absis
  4: {
    pos: [1.01, 0.224, 6.439],
    target: [-1.479, -1.013, 6.381],
  },
  // Absidiola nord
  5: {
    pos: [1.319, -4.339, 6.099],
    target: [0.616, -4.688, 6.112],
  },
  // Absidiola sud
  6: {
    pos: [-2.467, 3.735, 5.154],
    target: [-3.716, 2.947, 5.146],
  },
  // Avantsala
  7: {
    pos: [-6.176, -3.286, 6.267],
    target: [-5.62, -1.918, 6.309],
  },
};

const CleanUpBoundingBoxes = [
  {
    id: 0,
    name: "CleanUp0",
    pos: [1.113, -0.084, -5.627],
    rot: [-0.21, -0.065, 0.335],
    siz: [28.387, 29.265, 16.79],
    clip_inside: false,
  },
  {
    id: 1,
    name: "CleanUp1",
    pos: [-2.911, 9.158, 1.0],
    rot: [0.0, 0.0, 0.433],
    siz: [23.693, 2.191, 2.081],
    clip_inside: false,
  },
];

const AnimationRoutes = {
  exterior: {
    positions: [
      [4.301, 18.667, 9.064],
      [2.937, 16.407, 7.356],
      [-14.88, 6.714, 11.222],
      [-5.072, -13.496, 12.957],
      [15.491, -3.73, 11.719],
      [9.314, 13.92, 8.871],
      [-2.008, 10.162, 4.648],
    ],
    targets: [
      [0.682, 4.643, 5.163],
      [0.16, 1.812, 5.291],
      [-3.365, -0.034, 4.377],
      [0.523, -1.73, 5.525],
      [2.919, 1.304, 5.269],
      [0.692, 2.374, 4.704],
      [4.586, -3.242, 3.284],
    ],
    duration: 40,
  },
};

export default BoundingBoxes;
export { ViewType };
export { Cameras };
export { CleanUpBoundingBoxes };
export { AnimationRoutes };
