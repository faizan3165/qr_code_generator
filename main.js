document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const sizeOptions = document.querySelector(".size");
  const userInput = document.getElementById("placement");
  const submitBtn = document.getElementById("generate");
  const downloadBtn = document.getElementById("download");
  const BGColor = document.getElementById("color1");
  const FGColor = document.getElementById("color2");

  let QR_CODE;
  let sizeChoice = 100;
  let BGColorChoice = "#000000";
  let FGColorChoice = "#ffffff";

  sizeOptions.addEventListener("change", () => {
    sizeChoice = sizeOptions.value;
  });

  BGColor.addEventListener("input", () => {
    BGColorChoice = BGColor.value;
  });

  FGColor.addEventListener("input", () => {
    FGColorChoice = FGColor.value;
  });

  userInput.addEventListener("input", () => {
    if (userInput.value.trim().length < 1) {
      submitBtn.disabled = true;
      downloadBtn.href = "";
      downloadBtn.classList.add("hide");
    } else {
      submitBtn.disabled = false;
    }
  });

  const inputFormatter = (value) => {
    value = value.replace(/[^a-z0-9A-Z]+/g, "");
    return value;
  };

  const generateQRCode = async () => {
    container.innerHTML = "";

    QR_CODE = new QRCode(container, {
      text: userInput.value,
      width: sizeChoice,
      height: sizeChoice,
      colorDark: FGColorChoice,
      colorLight: BGColorChoice,
    });

    const dataURL = container.querySelector("canvas").toDataURL("image/png");

    downloadBtn.href = dataURL;

    let userValue = userInput.value;
    try {
      userValue = new URL(userValue).hostname;
    } catch (_) {
      userValue = inputFormatter(userValue);
    }
    downloadBtn.download = `${userValue}QR.png`;

    downloadBtn.classList.remove("hide");
  };

  window.onload = () => {
    // Set default values
    sizeOptions.value = sizeChoice;
    BGColor.value = BGColorChoice;
    FGColor.value = FGColorChoice;
    submitBtn.disabled = true;
    downloadBtn.classList.add("hide");
  };

  submitBtn.addEventListener("click", generateQRCode);
});
