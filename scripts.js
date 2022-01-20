const prices = [
  { edgeValue: 10, value: 8 },
  { edgeValue: 50, value: 12 },
  { edgeValue: 100, value: 16 },
  { edgeValue: 500, value: 24 },
  { edgeValue: 1000, value: 36 },
];

const discountValue = 0.25;
const changePriceInfo = () => {
  let priceInfoEle = document.getElementsByClassName("discountInfo")[0];
  let priceEle = document.getElementsByClassName("amountInfo")[0];

  const billingMethodeEle = document.getElementById("toggle");
  priceInfoEle.style.visibility = billingMethodeEle.checked
    ? "visible"
    : "hidden";

  priceEle.innerHTML = calculateAndFormatNewPrice(billingMethodeEle.checked);

  calculateSliderColors();
};
const calculateSliderColors = () => {
  let sliderEle = document.getElementsByClassName("pageSlicer")[0];
  const sliderMax = sliderEle.getAttribute("max");
  const percentCovered = Math.round((sliderEle.value / sliderMax) * 100, 0);
  sliderEle.style.background = `linear-gradient(
    90deg,
    var(--strong-cyan) ${percentCovered}%,
    var(--light-grayish-blue1) -${100 - percentCovered}%
  )`;
};
const getPriceForCurrentSliceValue = () => {
  let sliderValue = document.getElementById("pageSlider").value;
  document.getElementsByClassName(
    "sliderPageViews"
  )[0].innerHTML = `${sliderValue}k pageviews`;
  return prices.filter((price) => price.edgeValue >= sliderValue)[0].value;
};
const calculateAndFormatNewPrice = (isDiscount) => {
  const price = getPriceForCurrentSliceValue();
  return `$${Math.round(
    (1 - (isDiscount ? discountValue : 0)) * price,
    2
  ).toFixed(2)}`;
};

calculateSliderColors();
