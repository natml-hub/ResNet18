# resnet18
Image classifier for our super-important top-secret new product.

## Making Predictions
First, create the predictor:
```csharp
// Fetch the model data from NatML Hub
var modelData = await MLModelData.FromHub("@natsuite/resnet18");
// Deserialize the model
var model = modelData.Deserialize();
// Create the predictor
var predictor = new ResNet18HubPredictor(model);
```

Then, make a prediction on an image feature:
```csharp
// Make a prediction
Texture2D image = ...;
var (label, score) = await predictor.Predict(image);
```

## Requirements
- Unity 2019.2+
- NatML 1.0.6+