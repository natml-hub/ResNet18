/* 
*   resnet18
*   Copyright (c) 2021 NatML.
*/

import { MLModel, MLHubModel, IMLAsyncPredictor, MLFeature, MLArrayFeature, MLImageFeature, MLTextFeature } from "natml"

/**
 * Image classifier for our super-important top-secret new product.
 * Given an image, the predictor returns the class label and confidence score.
 */
export class ResNet18HubPredictor implements IMLAsyncPredictor<[string, number]> {

    private readonly model: MLHubModel;

    /**
     * Create the predictor.
     * @param model ML model.
     */
    public constructor (model: MLModel) {
        this.model = model as MLHubModel;
    }

    /**
     * Make a prediction.
     * @param features Input features.
     * @returns Prediction output.
     */
    public async predict (...features: MLFeature[]) {
        // Check inputs
        if (features.length !== 1 || !(features[0] instanceof MLImageFeature))
            throw new Error(`ResNet18HubPredictor expects a single image feature`);
        // Predict
        const hubFeature = await features[0].serialize();
        const results = await this.model.predict(hubFeature);
        // Marshal
        const label = (results[0] as MLTextFeature).text;
        const score = (results[1] as MLArrayFeature<Float32Array>).data[0];
        return [label, score] as [string, number];
    }
}