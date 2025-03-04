import { useEffect, useState } from "react";
import PropertyForm from "./components/Form";
import { normalizeInput, trainModel } from "./models/brainModel";
import { loadJSON } from "./utils/preprocess";

function App() {
    const [trainedNet, setTrainedNet] = useState(null);
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        async function fetchDataAndTrainModel() {
            const jsonData = await loadJSON("/synthetic_real_estate_data.json");
            const trainingData = jsonData.map(item => ({
                input: normalizeInput(item),
                output: { price: (item.price - 50000) / (1000000 - 50000) }
            }));

            const net = trainModel(trainingData);
            setTrainedNet(net);
        }

        fetchDataAndTrainModel();
    }, []);

    const handleFormSubmit = (data) => {
        if (!trainedNet) {
            alert("Model is still training. Try again in a few seconds.");
            return;
        }

        const normalizedInput = normalizeInput(data);
        const output = trainedNet.run(normalizedInput);
        const predictedPrice = output.price * 1000000; // Convert back from normalized value

        setPrediction(predictedPrice.toFixed(2));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">🏡 Real Estate Price Predictor</h1>
            <PropertyForm onSubmit={handleFormSubmit} />
            {prediction && <p className="text-center text-green-600 text-2xl mt-4">💰 Predicted Price: ${prediction}</p>}
        </div>
    );
}

export default App;
