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
  apsidiole: {
    positions: [
      [-2.516, 0.038, 4.982],
      [-3.242, 1.647, 4.97],
      [-4.296, 2.469, 4.985],
      [-5.446, 1.743, 6.021],
      [-5.276, 1.144, 6.023],
      [-5.398, 1.365, 6.036],
      [-6.123, 1.213, 6.024],
      [-6.197, 2.232, 6.003],
      [-5.362, 1.887, 5.981],
      [-6.901, 1.788, 6.037],
      [-6.142, 2.587, 5.965],
      [-5.419, 2.251, 5.168],
      [-4.93, 2.231, 4.203],
      [-3.963, 2.754, 4.155],
      [-5.237, 1.999, 5.799],
    ],
    targets: [
      [-5.734, 6.45, 4.989],
      [-4.521, 4.831, 4.999],
      [-7.359, 0.928, 4.853],
      [-4.611, -3.419, 6.136],
      [-7.623, -4.171, 5.924],
      [-10.561, 0.578, 5.76],
      [-8.502, 5.866, 6.244],
      [-0.985, 2.107, 5.586],
      [-5.101, -1.534, 6.038],
      [-1.223, -2.534, 5.292],
      [-6.182, -3.174, 6.729],
      [-7.381, -0.756, 9.737],
      [-7.183, 0.931, 8.126],
      [-7.711, 1.063, 6.447],
      [-7.656, 0.416, 10.158],
    ],
    duration: 45,
  },
  interior: {
    positions: [
      [-2.008, 10.162, 4.648],
      [0.414, 4.098, 4.921],
      [4.267, -0.798, 5.746],
      [5.552, -3.553, 6.092],
      [-0.411, -5.295, 5.94],
      [-1.417, -2.187, 6.853], //
      [4.835, -0.57, 6.669],
      [4.592, 3.686, 6.401],
      [2.583, 3.025, 6.242],
      [2.161, -0.63, 6.032],
      [-0.326, -1.792, 5.684],
      [-5.126, -1.135, 6.566],
      [-6.501, -2.683, 6.341],
      [-4.869, -4.403, 6.144],
      [-3.514, -2.708, 6.148],
      [-2.399, -0.909, 5.634],
      [-2.516, 0.038, 4.982],
    ],
    targets: [
      [4.586, -3.242, 3.284],
      [1.989, 0.627, 4.858],
      [7.698, -15.322, 4.235],
      [-8.161, -9.52, 4.939],
      [-7.859, 7.43, 3.184],
      [10.737, 6.602, 6.68], //
      [10.202, 8.947, 6.212],
      [-5.492, -0.482, 5.689],
      [-2.396, -2.077, 5.431],
      [-11.119, -7.593, 5.632],
      [-10.77, 1.402, 5.138],
      [-11.683, -5.418, 5.08],
      [-3.809, -8.518, 5.708],
      [-0.571, -0.538, 5.551],
      [1.5, 1.288, 6.915],
      [-2.635, 5.147, 3.407],
      [-5.734, 6.45, 4.989],
    ],
    duration: 45,
  },
};

const Annotations = [
  // === Exterior === //
  {
    position: [7.599, 12.183, 3.023],
    cameraPosition: [8.409, 14.462, 3.61],
    cameraTarget: [7.013, 10.977, 4.276],
    title: `< Cap al pont gòtic`,
    description: `Un camí descendeix cap al pont gòtic de Pedret, un pont de pedra molt ben 
    conservat que creua el riu Llobregat i duu cap al municipi Berga.`,
  },
  {
    position: [6.721, 2.946, 5.56],
    cameraPosition: [8.895, 6.406, 5.792],
    cameraTarget: [7.315, 1.973, 5.699],
    title: `Porta oest`,
    description: `Durant l'epoca prerromànica, a la cara oest de la nau principal hi havia una
    porta. Avui en dia aquesta porta ja no existeix.`,
  },
  {
    position: [5.769, -6.656, 7.229],
    cameraPosition: [-1.87, -12.226, 11.199],
    cameraTarget: [-0.529, -5.658, 7.898],
    title: `Llera de pedres`,
    description: `Les naus són a diferents alçades, ja que l'església es troba en desnivell perquè 
    està situada a una llera de pedres (possiblement d'aquí el nom de "Pedret") inclinada, 
    sent la nau nord la més elevada i la nau sud la més baixa.`,
  },
  {
    position: [0.784, 3.334, 4.841],
    cameraPosition: [-2.807, 7.085, 4.351],
    cameraTarget: [-1.035, 6.118, 4.528],
    title: `Entrada`,
    description: `Un porxo dóna cobertura a la portada romànica original, la porta principal i únic 
    accés actualment al monument. 
    <br></br>
    Està formada per arquivoltes llises recolzades en línies d'imposta, flanquejades per capitells 
    decorats i sostinguts per un fust estrigilat (oest) i un de salomònic (est), 
    ambdós assentats en bases.`,
  },
  {
    position: [2.866, 1.084, 10.082],
    cameraPosition: [5.63, 2.559, 9.641],
    cameraTarget: [3.674, 1.537, 9.197],
    title: `Teulada`,
    description: `Durant el canvi d'etapa d'estil preromànic a romànic, es va substituir la teulada 
    de fusta a dues aigües per la tradicional volta de canó de pedra. 
    <br></br>
    Aquest canvi va obligar a reforçar els murs de la nau central per tal de suportar la nova teulada, 
    que era molt més pesada.`,
  },
  // === Nau principal === //
  {
    position: [3.019, 0.922, 5.56],
    cameraPosition: [5.154, 3.773, 5.63],
    cameraTarget: [3.262, 0.675, 5.316],
    title: `Nau principal`,
    description: `L'església original és d'estil preromànic, d'una sola nau, 
    la central, amb absis trapezoidal, del segle IX. 
    <br></br>
    Al segle següent es va realitzar l'ampliació a les tres naus actuals, 
    afegint dues naus laterals a cada cantó de la nau principal. `,
  },
  // === Avantsala === //
  {
    position: [-3.35, 3.33, 5.673],
    cameraPosition: [-2.912, 0.233, 5.681],
    cameraTarget: [-3.782, 3.549, 5.823],
    title: `Avantsala`,
    description: `De la nau sud només se'n conserva una petita avantsala contigua a l'absidiola. 
    La resta va ser substituït al segle XIII per un campanar de torre que va caure, possiblement amb els terratrèmols del segle XV.`,
  },
];

/*  >>> Nomes queden les pintures al fresc i traduir-ho tot a lang-context.js
{
  position: [],
  cameraPosition: [],
  cameraTarget: [],
  title: ``,
  description: ``,
},
*/

export default BoundingBoxes;
export { ViewType };
export { Cameras };
export { CleanUpBoundingBoxes };
export { AnimationRoutes };
export { Annotations };
