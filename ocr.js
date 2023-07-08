//Initate Tesseract model wasm using worker:



//Glob variable OCR worker:
const worker = Tesseract.createWorker({
  logger: m => console.log(m)
});
Tesseract.setLogging(true);



//Initiate Tesseract worker:
async function Init()
{
  //console.log('Initiate worker')
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  
  //Recognize only phone numbers:
  await worker.setParameters({ tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',});
  
  //Enable start button:
  enableWebcamButton.classList.remove('invisible');
  enableWebcamButton.innerHTML = 'Start camera';
  console.log('Finished loading tesseract');
}




//Function perform OCR on image
async function Recognize(image)
{
  let result = await worker.recognize(image);
  console.log(result.data.text);
  console.log('Finished recognizing');
  return result.data.text;
}

//Function terminates the worker:
async function ShutDownWorker()
{
  await worker.terminate();
}
