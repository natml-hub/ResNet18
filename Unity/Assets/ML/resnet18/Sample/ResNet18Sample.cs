/* 
*   resnet18
*   Copyright (c) 2021 natsuite.
*/

namespace NatSuite.Examples {

    using UnityEngine;
    using NatSuite.ML;
    using NatSuite.ML.Features;
    using NatSuite.ML.Vision;

    public sealed class ResNet18Sample : MonoBehaviour {
        
        [Header(@"NatML Hub")]
        public string accessKey;

        [Header(@"Prediction")]
        public Texture2D image;

        async void Start () {
            Debug.Log("Fetching model from NatML Hub");
            // Fetch model data from NatML Hub
            var modelData = await MLModelData.FromHub("@natsuite/resnet18", accessKey);
            // Deserialize the model
            var model = modelData.Deserialize();
            // Create the predictor
            var predictor = new ResNet18HubPredictor(model);
            // Make a prediction
            var (label, score) = await predictor.Predict(image);
            Debug.Log($"Image contains {label} with confidence {score}");
            // Dispose the model
            model.Dispose();
        }
    }
}