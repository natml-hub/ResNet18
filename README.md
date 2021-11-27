# ResNet 18
Image classifier for our super-important top-secret new product.

## Making Predictions
First, create the predictor:
```typescript
// Fetch the model data from NatML Hub
const modelData = await MLModelData.fromHub("@natsuite/resnet18");
// Deserialize the model
const model = modelData.deserialize();
// Create the predictor
const predictor = new ResNet18HubPredictor(model);
```

Then create an image feature:
```typescript
// Create an iamge feature
const feature = new MLImageFeature("cat.jpg");
```

Finally, classify the image feature:
```typescript
// Classify the image
const [label, score] = await predictor.predict(feature);
// Log result
console.log(`Image contains ${label} with confidence ${score}`);
```