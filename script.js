const analysisContent = document.querySelector('.analysis__content');
const contentWrapper = document.querySelector('.analysis__text form');
const phrase = document.querySelector('.analysis__phrase');
const phraseLength = document.querySelector('.analysis__length');
const specialOptions = document.querySelector('.analysis__specialOptions');
const letterSize = document.querySelector('.analysis__letterSize');
const appearances = document.querySelector('.analysis__appearances');
const fontsColor = document.querySelector('.analysis__fontsColor');
const fontsBold = document.querySelector('.analysis__bold');
const fontsUnderscore = document.querySelector('.analysis__underscore');
const analysisStart = document.querySelector('.analysis__start');
const analysisReset = document.querySelector('.analysis__reset');
const message = document.querySelector('.analysis__message');
const results = document.querySelector('.analysis__results');
const information = document.querySelector('.analysis__info');
const closeLink = document.querySelector('.analysis__link');
const punctuationMarks = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "[", "]", "{", "}", "<", ">", "?", "/", ",", ".", "'", ];

const showMessage = function (content) {
    message.classList.remove("visibility");
    information.textContent = content;
    closeLink.addEventListener("click", function () {
        message.classList.add("visibility");
    })
}

analysisStart.addEventListener("click", function () {
    if (analysisContent.value != "" && (phrase.value != "" || phraseLength.value != "0" || specialOptions.value != "0")) {
        contentWrapper.style.height = "48%";
        results.classList.remove("visibility");
        const resultContent = analysisContent.value.split(" ");
        for (let singleWord of resultContent) {
            const wordWrapper = document.createElement('span');
            wordWrapper.textContent = singleWord + " ";
            if (singleWord == phrase.value || singleWord.length == phraseLength.value) {
                wordWrapper.style.color = "red";
            }
            results.appendChild(wordWrapper);
        }


    } else if (analysisContent.value == "" && phrase.value == "" && phraseLength.value == "0" && specialOptions.value == "0") {
        showMessage("Wprowadź tekst do analizy. Następnie użyj przynajmniej jedną z trzech podstawowych opcji");
    } else if (analysisContent.value != "" && phrase.value == "" && phraseLength.value == "0" && specialOptions.value == "0") {
        showMessage("Użyj przynajmniej jedną z trzech podstawowych opcji");
    }

})

analysisReset.addEventListener("click", function () {
    analysisContent.value = "";
    phrase.value = "";
    phraseLength.value = "0";
    specialOptions.value = "0";
    letterSize.checked = false;
    appearances.checked = false;
    fontsColor.value = "0";
    fontsUnderscore.checked = false;
    results.classList.add("visibility");
    contentWrapper.style.height = "100%";

})



// if (phrase.value != "0") {
//     for (let singleWord of resultContent) {
//         const wordWrapper = document.createElement('span');
//         wordWrapper.textContent = singleWord + " ";
//         if (singleWord == phrase.value) {
//             wordWrapper.style.color = "red";
//         }
//         results.appendChild(wordWrapper);
//     }
// }