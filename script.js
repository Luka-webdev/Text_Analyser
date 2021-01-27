// Gaining access to all elements on the website

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

// Declaration of the function showing messages to the user

const showMessage = function (content) {
    message.classList.remove("visibility");
    information.textContent = content;
    closeLink.addEventListener("click", function () {
        message.classList.add("visibility");
    })
}

// Declaration of a function that gives styles to the found results

const addStyles = function (wrapper) {
    if (fontsColor.value != "0") {
        wrapper.style.color = fontsColor.value;
    }
    if (fontsBold.checked) {
        wrapper.style.fontWeight = "bold";
    }
    if (fontsUnderscore.checked) {
        wrapper.style.textDecoration = "underline";
    }
}

// Declaration of the function to search for special options

const search = function (pattern, flags) {
    let regex = new RegExp(pattern, flags);
    let fittedResults = [];
    let indexArray = [];
    indexArray.push(0)
    while (result = regex.exec(analysisContent.value)) {
        indexArray.push(result.index);
        indexArray.push(regex.lastIndex);
        fittedResults.push(RegExp.lastMatch);
    }
    indexArray.push(analysisContent.value.length);

    for (let i = 1; i < indexArray.length; i++) {
        const word = analysisContent.value.slice(indexArray[i - 1], indexArray[i]);
        const wordWrapper = document.createElement('span');
        wordWrapper.textContent = word;
        for (let fittedResult of fittedResults) {
            if (fittedResult == word) {
                addStyles(wordWrapper);
            }
        }
        results.appendChild(wordWrapper);
    }
}

// Support for the Analyze button

analysisStart.addEventListener("click", function () {

    if (results.textContent == "") {
        if (analysisContent.value != "" && (phrase.value != "" || phraseLength.value != "0" || specialOptions.value != "0")) {
            contentWrapper.style.height = "48%";
            results.classList.remove("visibility");

            const option = specialOptions.value;
            switch (option) {
                case '1':
                    search('(\\w+\\.)*\\w+@\\w+\\.\\w{2,4}', 'ig');
                    break;
                case '2':
                    search('\\d{2}-\\d{3}', 'ig');
                    break;
                case '3':
                    search('\\„.+\\”', 'ig');
                    break;
            };

        } else if (analysisContent.value == "" && phrase.value == "" && phraseLength.value == "0" && specialOptions.value == "0") {
            showMessage("Wprowadź tekst do analizy. Następnie użyj przynajmniej jednej z trzech podstawowych opcji wyszukiwania.");
        } else if (analysisContent.value != "" && phrase.value == "" && phraseLength.value == "0" && specialOptions.value == "0") {
            showMessage("Użyj przynajmniej jednej z trzech podstawowych opcji wyszukiwania.");
        }
    }
});

// Support for the Reset button

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
    const words = results.querySelectorAll('span');
    for (let i = 0; i < words.length; i++) {
        results.removeChild(words[i]);
    }
});