import { MLModelData, MLImageFeature } from "natml"
import { ResNet18HubPredictor } from "../src"

async function main () {
    // Fetch the model data from NatML Hub
    const modelData = await MLModelData.fromHub("@natsuite/resnet18", process.env.ACCESS_KEY);
    // Deserialize the model
    const model = modelData.deserialize();
    // Create the predictor
    const predictor = new ResNet18HubPredictor(model);
    // Predict
    const feature = new MLImageFeature("cat.jpg");
    const [label, score] = await predictor.predict(feature);
    console.log(`Image contains ${label} with confidence ${score}`);
}

main();