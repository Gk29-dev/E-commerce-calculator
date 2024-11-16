const profitCalculateForm = document.getElementById("profitCalForm");

// When form is submitted, calculate profit
profitCalculateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get productPrice and sellingPrice values
  const productPrice = parseFloat(
    document.getElementById("productPrice").value.trim()
  );
  const sellingPrice = parseFloat(
    document.getElementById("sellingPrice").value.trim()
  );

  // Validate inputs
  if (
    isNaN(productPrice) ||
    isNaN(sellingPrice) ||
    productPrice <= 0 ||
    sellingPrice <= 0
  ) {
    alert("Please enter valid prices for product and selling price.");
    return;
  }

  // Common fees
  const returnRTO = 0.25 * productPrice;
  const promotion = 0.05 * sellingPrice;
  const packagingFee = 15;
  const additionalCostFee = 10;

  // Calculate profit for Amazon and Flipkart
  const amazonProfit = calculateProfit(
    "Amazon",
    productPrice,
    sellingPrice,
    returnRTO,
    promotion,
    packagingFee,
    additionalCostFee
  );
  displayResults("Amazon", amazonProfit);

  const flipkartProfit = calculateProfit(
    "Flipkart",
    productPrice,
    sellingPrice,
    returnRTO,
    promotion,
    packagingFee,
    additionalCostFee
  );

  displayResults("Flipkart", flipkartProfit);

  // Output results
  console.log(amazonProfit);
  console.log(flipkartProfit);
});

// Generalized profit calculation function
const calculateProfit = (
  platform,
  productPrice,
  sellingPrice,
  returnRTO,
  promotion,
  packagingFee,
  additionalCostFee
) => {
  let referralFeeRate, fixedFee, shippingFee, gstRate, platformName;

  if (platform === "Amazon") {
    platformName = "Amazon";
    referralFeeRate = 0.1; // 10% referral fee for Amazon
    fixedFee = 9; // No fixed fee for Amazon
    shippingFee = 81;
    gstRate = 0.18;
  } else if (platform === "Flipkart") {
    platformName = "Flipkart";
    referralFeeRate = 0.16; // 16% referral fee for Flipkart
    fixedFee = 69; // Fixed fee for Flipkart
    shippingFee = 16;
    gstRate = 0.18;
  }

  // Calculate fees
  const referralFee = referralFeeRate * sellingPrice;
  const platformShippingFee = shippingFee;
  const totalGST = gstRate * (referralFee + fixedFee + platformShippingFee);
  const totalPlatformFee =
    referralFee + fixedFee + platformShippingFee + totalGST;

  // Calculate total cost and profit
  const totalCost =
    productPrice +
    totalPlatformFee +
    returnRTO +
    promotion +
    packagingFee +
    additionalCostFee;
  const netProfit = sellingPrice - totalCost;
  const profitPercentage = (netProfit / totalCost) * 100;

  return {
    platform: platformName,
    productPrice: productPrice.toFixed(2),
    sellingPrice: sellingPrice.toFixed(2),
    referralFee: referralFee.toFixed(2),
    fixedFee: fixedFee.toFixed(2),
    shippingFee: platformShippingFee.toFixed(2),
    totalGST: totalGST.toFixed(2),
    returnRTO: returnRTO.toFixed(2),
    promotion: promotion.toFixed(2),
    packagingFee: packagingFee.toFixed(2),
    additionalCostFee: additionalCostFee.toFixed(2),
    totalPlatformFee: totalPlatformFee.toFixed(2),
    totalCost: totalCost.toFixed(2),
    netProfit: netProfit.toFixed(2),
    profitPercentage: profitPercentage.toFixed(2),
  };
};

// Display the results dynamically
const displayResults = (platform, results) => {
  if (platform === "Amazon") {
    document.getElementById("amazonProductPriceFee").innerText =
      results.productPrice;
    document.getElementById("amazonSellingPriceFee").innerText =
      results.sellingPrice;
    document.getElementById("amazonReturnRTO").innerText = results.returnRTO;
    document.getElementById("amazonPromotions").innerText = results.promotion;
    document.getElementById("amazonReferralFee").innerText =
      results.referralFee;
    document.getElementById("amazonClosingFee").innerText = results.fixedFee;
    document.getElementById("amazonShippingFee").innerText =
      results.shippingFee;
    document.getElementById("amazonTotalCost").innerText = results.totalCost;
    document.getElementById("amazonNetProfit").innerText = results.netProfit;
    document.getElementById("amazonGST").innerText = results.totalGST;
    document.getElementById("amazonTotalPlatformFee").innerText =
      results.totalPlatformFee;
    document.getElementById("amazonNetProfitInPerc").innerText =
      results.profitPercentage + "%";
  }

  if (platform === "Flipkart") {
    document.getElementById("flipkartProductPriceFee").innerText =
      results.productPrice;
    document.getElementById("flipkartSellingPriceFee").innerText =
      results.sellingPrice;
    document.getElementById("flipkartReturnRTO").innerText = results.returnRTO;
    document.getElementById("flipkartPromotions").innerText = results.promotion;
    document.getElementById("flipkartReferralFee").innerText =
      results.referralFee;
    document.getElementById("flipkartClosingFee").innerText = results.fixedFee;
    document.getElementById("flipkartShippingFee").innerText =
      results.shippingFee;
    document.getElementById("flipkartTotalCost").innerText = results.totalCost;
    document.getElementById("flipkartNetProfit").innerText = results.netProfit;
    document.getElementById("flipkartGST").innerText = results.totalGST;
    document.getElementById("flipkartTotalPlatformFee").innerText =
      results.totalPlatformFee;
    document.getElementById("flipkartNetProfitInPerc").innerText =
      results.profitPercentage + "%";
  }
};
