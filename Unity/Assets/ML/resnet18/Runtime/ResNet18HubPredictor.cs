/* 
*   resnet18
*   Copyright (c) 2021 NatML.
*/

namespace NatSuite.ML.Vision {

    using System;
    using System.Threading.Tasks;
    using NatSuite.ML;
    using NatSuite.ML.Features;
    using NatSuite.ML.Internal;

    /// <summary>
    /// Image classifier for our super-important top-secret new product.
    /// </summary>
    public sealed class ResNet18HubPredictor : IMLAsyncPredictor<(string label, float score)> {

        #region --Client API--
        /// <summary>
        /// Create the ResNet18 predictor.
        /// </summary>
        /// <param name="model">ML model.</param>
        public ResNet18HubPredictor (MLModel model) => this.model = model as MLHubModel;

        /// <summary>
        /// Classify an image.
        /// </summary>
        /// <param name="inputs">Input image.</param>
        /// <returns>Predicted label with confidence score.</returns>
        public async Task<(string label, float score)> Predict (params MLFeature[] inputs) {
            // Check inputs
            if (inputs.Length != 1 || !(inputs[0] is MLImageFeature))
                throw new ArgumentException("ResNet18HubPredictor expects a single image feature", nameof(inputs));
            // Predict
            var hubFeature = (inputs[0] as IMLHubFeature).Serialize();
            var results = await model.Predict(hubFeature);
            // Marshal
            var label = (results[0] as MLTextFeature).text;
            var score = (results[1] as MLArrayFeature<float>)[0];
            return (label, score);
        }
        #endregion


        #region --Operations--
        private readonly MLHubModel model;

        void IDisposable.Dispose () { }
        #endregion
    }
}