var bu = document.getElementById("bu");
var textValue = document.getElementById("value");
var value = parseInt(document.getElementById("value").innerText);
console.log(value)
bu.addEventListener('click', () => {
    console.log("pressed")
    value += 1;
    textValue.innerText = value;
})