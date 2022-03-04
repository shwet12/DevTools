export default function JsonPreviewer() {
  let inputJsonDiv;
  let outputJsonDiv;
  let formatBtn;

  const handleFormat = function () {
    if (inputJsonDiv.value) {
      const data = JSON.stringify(JSON.parse(inputJsonDiv.value), null, 4);
      outputJsonDiv.value = data;
    }
  };

  // const bindFormatBtnClick = () => {
  //   console.log(inputJsonDiv.value);
  //   console.log(outputJsonDiv.value);

  //   formatBtn.addEventListener('click', handleFormat);
  // };

  const initSelectors = (app) => {
    inputJsonDiv = app.querySelector('.large-area--input');
    outputJsonDiv = app.querySelector('.large-area--output');
    formatBtn = app.querySelector('.format__btn');
  };
  const init = () => {
    const jsonapp = document.createElement('div');
    jsonapp.classList.add('json__viewer');

    // input data
    const jsonInput = document.createElement('div');
    jsonInput.innerHTML = `<textarea class="large-area large-area--input" placeholder="Enter your JSON here...">
    {"name": "Shwet"}
    </textarea>`;

    // controls
    const btn = document.createElement('button');
    btn.classList.add('format__btn');
    btn.innerText = 'Format';
    btn.addEventListener('click', handleFormat);

    // out data
    const jsonOutput = document.createElement('div');
    jsonOutput.innerHTML = '<textarea readonly class="large-area large-area--output" placeholder="Your JSON will appear here..."></textarea>';

    jsonapp.append(jsonInput);
    jsonapp.append(btn);
    jsonapp.append(jsonOutput);
    initSelectors(jsonapp);
    return jsonapp;
  };

  function destroy() {
    formatBtn.removeEventListener('click', handleFormat);
  }
  return {
    init,
    destroy,
  };
}
