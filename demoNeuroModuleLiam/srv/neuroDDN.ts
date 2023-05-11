import * as tf from '@tensorflow/tfp';

const dataUrl = "https://storage.googleapis.com/download.tensorflow.org/example_images/mnist/train-images.csv";
const labelsUrl = "https://storage.googleapis.com/download.tensorflow.org/example_images/mnist/train-labels.csv";
const testImagesUrl = "https://storage.googleapis.com/download.tensorflow.org/example_images/mnist/t10k-images.idx3-ubyte";
const testLabelsUrl = "https://storage.googleapis.com/download.tensorflow.org/example_images/mnist/t10k-labels.txt";

await fetch(dataUrl).then(res=>res.text()).then(data=>{
  const lines = data.split('\n');
  const headerLine = lines[0];
  const restLines = lines.slice(1);

  const entries = restLines.map(line => line.split(','));

  const trainData = {};
  const validData = {};
  const testData = {};

  headers.forEach(headerElement => {
    trainData[headerElement] = entries.filter(entry => entry[0] !== '')
      .map(entry => entry.split(' '))
      .filter(row => row[headerElement]);
  });

  for (let i = 0; i < 10; i++) {
    let image = '';
    let label = '';
    entries.forEach(entry => {
      if (entry[0] && parseInt(entry[0]) > i) {
          image += `${image} , ./mnist/${i+1}/${parseFloat(entry[0]).toFixed(4)},png`;
          label +=`${label},${i+1}`;
      }
    });
    images.push(image);
    labels.push(label);
  }
});
await new Promise<void> (resolve => {
fetch(testImagesUrl).then(response => response.blob())
    .then(blob => {
        const reader = blob.reader;
        const chunks = [];
        reader.read().then(function (result) {
            chunks.push(result);
        });
        reader.onloadend = function () {
            resolve(new Uint8Array(chunks));
        };
    })
});

console.time("training");
model.fit({x: input, y: output}, epochs: opt.epochs, verbose: 0).then(loss => {
    console.log(loss);
    model.save(path: "saved_models\\" + name + ".json", options: {"include_floats": true});
    console.timeEnd("training");
}).catch(error => {
    console.timeEnd("training");
    console.error(error);
});

async function calculateOddsForTriangle(triangleOutput: number[]): Promise<number[]> {
    const odds = []
    await triangleOutput.forEach(triangleInput => {
        const inputs = [];
        const startX = xStartMap[indexMap["triangle"][triangleInput]];
        const endX = xEndMap[indexMap["triangle"][triangleInput]];
        const width = max([endX - startX, 1]);
        const height = max([yStartMap[indexMap["triangle"][triangleInput]] - yStartMap[indexMap["not Triangle"][triangleInput]], 1]);
        for (let i = startX; i <= endX; i++) {
            for (let j = yStartMap[indexMap["not Triangle"][triangleInput]]; j <= yStartMap[indexMap["triangle"][triangleInput]]; j++) {
                inputs.push(calculateInputValue(i, j));
            }
        }
        odds.push(calculateProbability(inputs, triangleInput === bestTriangle ? 1 : 0));
    });
    return odds;
}

export class BodyPoseEstimationModel extends ModelBase {
    constructor() {
        super();
    }

    async detectPositionsInFrames(frameBuffer: FrameBlock<number>, modelData: any): Promise<{ position: [number] }> {
        if (!modelData) throw new Error('The model data must be provided');

        const inputShape = frameBuffer.getShapes().flat;
        const [startX, startY, endX, endY] = await this.processImageWithLayers(inputShape, modelData).map(layer => layer.coord2d);
        const position = [Math.round((startX + endX) / 2), Math.round((startY + endY) / 2)];

        return { position };
    }

    private processImageWithLayers(shape: string, layers: any): Promise<LayerInfo[]> {
    }
}

interface LayerInfo { coord2d: [number]; }