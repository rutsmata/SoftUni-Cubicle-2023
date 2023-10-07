const uniqid = require("uniqid");
const cubes = [
  {
    id: "h3h38sad",
    name: "Mirror Cube",
    description: "Descr Mirror Cube",
    imageUrl:
      "https://media.istockphoto.com/id/473622694/photo/rubiks-cube.jpg?s=612x612&w=0&k=20&c=jG8vgbrd8jsLPYwzNTgoALf86E20dbTBC30S77QjyhY=",
    difficultyLevel: 5,
  },
  {
    id: "5d22d5ss4d5f52d2d2d6",
    name: "Rubik Cube",
    description: "Descr Rubik Cube",
    imageUrl:
      "https://w7.pngwing.com/pngs/590/189/png-transparent-rubik-s-cube-puzzle-three-dimensional-space-cube-thumbnail.png",
    difficultyLevel: 5,
  },
];

exports.getAll = (search, from, to) => {
  let result = cubes.slice();

  if (search) {
    result = result.filter((cube) => cube.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (from) {
    result = result.filter(cube => cube.difficultyLevel >= Number(from))
  }

  if (to) {
    result = result.filter(cube => cube.difficultyLevel <= Number(to))

  }

  return result;
};

exports.getOne = (cubeId) => cubes.find((x) => x.id === cubeId);

exports.create = (cubeData) => {
  const newCube = {
    id: uniqid(),
    ...cubeData,
  };
  cubes.push(newCube);

  return newCube;
};
