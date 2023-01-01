// const puppeteer = require("puppeteer");
// const OpenAi = require("openai");
// const { Configuration, OpenAIApi } = OpenAi;

// const configuration = new Configuration({
//   organization: "org-FXl4rbDAnncM1Zy8R4i1X8g6",
//   apiKey: "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",
// });
// const openai = new OpenAIApi(configuration);
// exports.handler = async function (event, context) {
//   const responses = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt:
//       "give me the code which can open youtube with the help of puppeteer and then upload the video from my computer and also login with my id and then show the views of my video",

//     max_tokens: 1000,
//     temperature: 0,
//   });
//   const title = responses.data.choices[0].text;
//   console.log(title);
// };
