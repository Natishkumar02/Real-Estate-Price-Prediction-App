import { NeuralNetwork } from "brain.js"; // ✅ Correct way to import

export function trainModel(trainingData) {
    const net = new NeuralNetwork({ hiddenLayers: [10, 5], activation: "relu" });

    net.train(trainingData, {
        iterations: 20000,
        learningRate: 0.05,
        errorThresh: 0.005,
        log: true,
        logPeriod: 1000
    });

    return net;
}


export function normalizeInput(input) {
    return {
        area: (input.area - 500) / (5000 - 500),
        bedrooms: (input.bedrooms - 1) / (5 - 1),
        bathrooms: (input.bathrooms - 1) / (4 - 1),
        age: (input.age - 0) / (100 - 0),
    };
}
