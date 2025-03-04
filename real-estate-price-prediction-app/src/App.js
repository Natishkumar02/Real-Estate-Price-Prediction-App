import React, { useState } from 'react';
import './App.css';
import PropertyForm from './components/PropertyForm';
import { loadModel, trainModel } from "./trainModel";

function App() {
  const [net, setNet] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
      const existingModel = loadModel();
      if (existingModel) {
          setNet(existingModel);
      }
  }, []);

  const handleFormSubmit = (formData) => {
      if (!net) {
          alert("Model not trained! Please train the model first.");
          return;
      }

      const normalizedInput = {
          area: (formData.area - 500) / (5000 - 500),
          bedrooms: (formData.bedrooms - 1) / (5 - 1),
          bathrooms: (formData.bathrooms - 1) / (4 - 1),
          age: (formData.age - 0) / (100 - 0),
      };

      const output = net.run(normalizedInput);
      setPrediction(output.price);
  };

  return (
      <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Real Estate Price Predictor</h1>
          <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
              onClick={() => setNet(trainModel(sampleTrainingData))}
          >
              Train Model
          </button>

          <PropertyForm onSubmit={handleFormSubmit} />

          {prediction && (
              <div className="mt-6 p-4 bg-green-100 border border-green-500 rounded-md">
                  <h2 className="text-xl font-bold">Predicted Price: ${prediction.toFixed(2)}</h2>
              </div>
          )}
      </div>
  );
}

export default App;
