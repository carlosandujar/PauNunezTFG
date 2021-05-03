const BoundingBoxes = {
  box0: {
    id: 0,
    name: "Sense teulada",
    pos: [-0.093, 0.127, 9.381],
    rot: [0.0, 0.0, 0.436],
    siz: [14.783, 11.831, 6.224],
    clip_inside: false,
  },
  box1: {
    id: 1,
    name: "Entrada",
    pos: [1.146, 6.95, 4.856],
    rot: [0.0, 0.0, 0.392],
    siz: [8.916, 6.148, 5.576],
    clip_inside: true,
  },
  box2: {
    id: 2,
    name: "Nau principal",
    pos: [1.543, 0.541, 6.074],
    rot: [0.0, 0.0, 0.444],
    siz: [10.459, 6.232, 6.331],
    clip_inside: true,
  },
  box3: {
    id: 3,
    name: "Nau lateral",
    pos: [3.196, -3.397, 5.33],
    rot: [0.0, 0.0, 0.459],
    siz: [10.431, 3.694, 4.034],
    clip_inside: true,
  },
  box4: {
    id: 4,
    name: "Absis",
    pos: [-4.879, -2.617, 6.254],
    rot: [0.0, 0.0, 0.449],
    siz: [4.479, 4.315, 4.885],
    clip_inside: true,
  },
  box5: {
    id: 5,
    name: "Absidiola nord",
    pos: [-2.167, -6.106, 6.124],
    rot: [0.0, 0.0, 0.426],
    siz: [2.426, 2.327, 3.372],
    clip_inside: true,
  },
  box6: {
    id: 6,
    name: "Absidiola sud",
    pos: [-5.803, 1.739, 4.914],
    rot: [0.009, -0.022, 0.533],
    siz: [2.382, 2.29, 3.895],
    clip_inside: true,
  },
  box7: {
    id: 7,
    name: "Avantsala",
    pos: [-3.621, 3.165, 6.286],
    rot: [0.0, 0.0, 0.531],
    siz: [3.009, 2.695, 6.542],
    clip_inside: true,
  },
};

const DefaultCamera = {
  pos: [-14.393, 14.591, 10.422],
  target: [-1.525, 2.822, 5.0],
};

export default BoundingBoxes;
export { DefaultCamera };
