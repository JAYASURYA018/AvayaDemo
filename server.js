const express = require("express");
const app = express();

app.use(express.json());

const dxDescriptions = {
  "M54.16": "Radiculopathy, lumbar region",
  "C34.11": "Malignant neoplasm of upper lobe, right bronchus or lung",
  "J84.9": "Interstitial pulmonary disease, unspecified",
  "G31.84": "Mild cognitive impairment, so stated",
  "H90.3": "Sensorineural hearing loss, bilateral",
};

app.post("/webhook", (req, res) => {
  const dxCode = req.body.sessionInfo.parameters.dxCode;

  if (dxDescriptions[dxCode]) {
    res.json({
      fulfillment_response: {
        messages: [
          {
            text: {
              text: [dxDescriptions[dxCode]],
            },
          },
        ],
      },
    });
  } else {
    res.json({
      fulfillment_response: {
        messages: [
          {
            text: {
              text: [
                "Sorry, I didn't recognize that DX code. Please try again.",
              ],
            },
          },
        ],
      },
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
