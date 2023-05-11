class RNN {
constructor(){
    const modelInput = tf.tensor2d(initialState, [sequenceLength, numHiddenUnits]);
    this.lstmModel = tf.sequential();
    this.lstmModel.add(tf.layers.lstm({units: numLSTMUnits, returnSeparator: false, returnLast=true}));
    this.lstmModel.add(tf.layers.dense({units: numOutputNodes}));

    this.compiledModel = this.lstmModel.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy' });
};

processSequence(seqData){
    this.initialState = seqData.initialState;
    sequenceLength = seqData.sequenceLength;
    numHiddenUnits = seqData.numHiddenUnits;
    numLSTMUnits = seqData.numLSTMUnits;
    numOutputNodes = seqData.numOutputNodes;
};

fit(trainingData, epochs = 50){
    let lossHistory = [];
    for (let epoch = 0; epoch < epochs; epoch++) {
        const currentTrainingStep = 0;

        while (currentTrainingStep < trainingData.length) {
            const sequenceLength = this.processSequence(trainingData[currentTrainingStep]);
            const inputs = tf.tensor2d(trainingData[currentTrainingStep].inputs, [sequenceLength, numInputNodes]);
            const targets = tf.tensor2d(trainingData[currentTrainingStep].targets, [sequenceLength, numClasses]);

            const logits = this.lstmModel.predict(inputs).dataSync();
            const predictionError = tf.math.reduceSum((logits - targets)).toFloat();
            const gradients = this.lstmModel.backward(predictionError).getGraph().getOperations()[0].gradients;

            if (epoch === 0 || currentTrainingStep % 100 == 0) {
                const optStep = this.lstmModel.optimize(tf.constant([0.1]), { learningRate: 0.001 }).dispose();
                lossHistory.push(...optStep.get(1));

                this.lstmModel.updateWeights(optStep.get(0));
                this.initialState = this.lstmModel.weights[3].dataSync();
            } else {
                lossHistory.push(...optStep.get(1));
            }

            currentTrainingStep++;
        };

        console.log(`EPOCH ${epoch + 1}`);
        console.log('Average Loss: ', lossHistory.reduce((a, b) => a + b / lossHistory.length, 0));
    }
};