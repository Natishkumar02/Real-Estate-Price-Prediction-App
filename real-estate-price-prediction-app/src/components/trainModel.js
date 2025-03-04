import { NeuralNetwork } from "brain.js";
import { openDB } from "idb";

export async function saveModelToDB(modelJSON) {
    const db = await openDB("RealEstateDB", 1, {
        upgrade(db) {
            db.createObjectStore("models");
        },
    });
    await db.put("models", modelJSON, "trainedModel");
}

export async function loadModelFromDB() {
    const db = await openDB("RealEstateDB", 1);
    return await db.get("models", "trainedModel");
}

export async function trainModel(trainingData) {
    const net = new NeuralNetwork({ hiddenLayers: [10, 5], activation: "relu" });

    net.train(trainingData, {
        iterations: 20000,
        learningRate: 0.05,
        errorThresh: 0.005,
        log: true,
        logPeriod: 1000
    });

    const modelJSON = net.toJSON();
    await saveModelToDB(modelJSON);

    return net;
}

export async function loadModel() {
    const modelJSON = await loadModelFromDB();
    if (modelJSON) {
        const net = new NeuralNetwork();
        net.fromJSON(modelJSON);
        return net;
    }
    return null;
}
