import * as readline from 'node:readline/promises';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

getTotalWithDiscount();

async function getTotalWithDiscount() {
    const costOfProductA = 20;
    const costOfProductB = 40;
    const costOfProductC = 50;
    const costOfGiftWrap = 1;
    const costOfShipping = 5;
    let giftWrapFee = 0;
    let shippingFee = 0;


    const quantityOfA = parseInt(await rl.question("How many units of product A, do you want?\n"));
    if (isNaN(quantityOfA)) {
        throw ("Invalid input, cannot accept strings");
    }
    if (quantityOfA < 0) {
        console.log("Number of units cannot be negative");
        rl.close();
        return;
    }
    let wrapA = "";
    if (quantityOfA > 0) {
        wrapA = await rl.question("Do you want them to be wrapped as a gift? (yes/no)\n");
    }

    const quantityOfB = parseInt(await rl.question("How many units of product B, do you want?\n"));
    if (isNaN(quantityOfB)) {
        throw ("Invalid input, cannot accept strings");
    }
    if (quantityOfB < 0) {
        console.log("Number of units cannot be negative");
        rl.close();
        return;
    }
    let wrapB = "";
    if (quantityOfB > 0) {
        wrapB = await rl.question("Do you want them to be wrapped as a gift? (yes/no)\n");
    }

    const quantityOfC = parseInt(await rl.question("How many units of product C, do you want?\n"));
    if (isNaN(quantityOfC)) {
        throw ("Invalid input, cannot accept strings");
    }
    if (quantityOfC < 0) {
        console.log("Number of units cannot be negative");
        rl.close();
        return;
    }
    let wrapC = "";
    if (quantityOfC > 0) {
        wrapC = await rl.question("Do you want them to be wrapped as a gift? (yes/no)\n");
    }

    if (wrapA == "Yes" || wrapA == "yes") {
        giftWrapFee += quantityOfA * costOfGiftWrap;
    }
    if (wrapB == "Yes" || wrapB == "yes") {
        giftWrapFee += quantityOfB * costOfGiftWrap;
    }
    if (wrapC == "Yes" || wrapC == "yes") {
        giftWrapFee += quantityOfC * costOfGiftWrap;
    }

    const totalQuantity = quantityOfA + quantityOfB + quantityOfC;
    let numberOfPackages = 0;
    if (totalQuantity % 10 == 0) {
        numberOfPackages = parseInt(totalQuantity / 10);
    }
    else {
        numberOfPackages = parseInt(totalQuantity / 10) + 1;
    }
    shippingFee = numberOfPackages * costOfShipping;

    const totalCostOfA = quantityOfA * costOfProductA;
    const totalCostOfB = quantityOfB * costOfProductB;
    const totalCostOfC = quantityOfC * costOfProductC;
    const subTotal = (totalCostOfA + totalCostOfB + totalCostOfC);
    let total = 0;

    console.log(`product A - ${quantityOfA} units - $${totalCostOfA}`);
    console.log(`product B - ${quantityOfB} units - $${totalCostOfB}`);
    console.log(`product C - ${quantityOfC} units -  $${totalCostOfC}`);

    console.log(`subTotal - $${subTotal}`);

    let flat_10_discount = getFlat_10_discount(subTotal);
    let bulk_5_discount = getBulk_5_discount(quantityOfA, totalCostOfA, quantityOfB, totalCostOfB, quantityOfC, totalCostOfC);
    let bulk_10_discount = getBulk_10_discount(totalQuantity, subTotal);
    let tiered_50_discount = getTiered_50_discount(totalQuantity, quantityOfA, quantityOfB, quantityOfC, costOfProductA, costOfProductB, costOfProductC);

    total += subTotal;

    if (flat_10_discount !== 0) {
        if (flat_10_discount >= bulk_5_discount && flat_10_discount >= bulk_10_discount && flat_10_discount >= tiered_50_discount) {
            console.log(`flat_10_discount - $${flat_10_discount}`);
            total -= flat_10_discount;
        }
        else if (bulk_5_discount >= flat_10_discount && bulk_5_discount >= bulk_10_discount && bulk_5_discount >= tiered_50_discount) {
            console.log(`bulk_5_discount - $${bulk_5_discount}`);
            total -= bulk_5_discount;
        }
        else if (bulk_10_discount >= flat_10_discount && bulk_10_discount >= bulk_5_discount && bulk_10_discount >= tiered_50_discount) {
            console.log(`bulk_10_discount - $${bulk_10_discount}`);
            total -= bulk_10_discount;
        }
        else {
            console.log(`tiered_50_discount - $${tiered_50_discount}`);
            total -= tiered_50_discount;
        }
    }
    else {
        console.log("You haven't bought enough to avail discount");
    }

    total += (shippingFee + giftWrapFee);

    console.log(`Shipping Fee - $${shippingFee} and Gift wrap Fee - $${giftWrapFee}`);
    console.log(`Total amount - $${total}`);

    rl.close();
    rl.on("close", () => {
        process.exit(0);
    })
}

//flat_10_discount
function getFlat_10_discount(subTotal) {
    let discount = 0;
    if (subTotal > 200) {
        discount = (subTotal * 0.1);
    }
    return discount;
}

//bulk_5_discount
function getBulk_5_discount(aQ, aC, bQ, bC, cQ, cC) {
    let discount = 0;
    if (aQ > 10) {
        discount += (aC * 0.05);
    }
    if (bQ > 10) {
        discount += (bC * 0.05);
    }
    if (cQ > 10) {
        discount += (cC * 0.05);
    }
    return discount;
}

//bulk_10_discount
function getBulk_10_discount(totalQuantity, subTotal) {
    let discount = 0;
    if (totalQuantity > 20) {
        discount = (subTotal * 0.1);
    }
    return discount;
}

//tiered_50_discount
function getTiered_50_discount(totalQuantity, quantityOfA, quantityOfB, quantityOfC, costOfProductA, costOfProductB, costOfProductC) {
    let discount = 0;
    if (totalQuantity > 30) {
        if (quantityOfA > 15 && quantityOfB > 15 && quantityOfC > 15) {
            discount = ((quantityOfA - 15) * (costOfProductA) * 0.5) + ((quantityOfB - 15) * (costOfProductB) * 0.5) + ((quantityOfC - 15) * (costOfProductC) * 0.5);
        }
        else if (quantityOfA > 15 && quantityOfB > 15) {
            discount = ((quantityOfA - 15) * (costOfProductA) * 0.5) + ((quantityOfB - 15) * (costOfProductB) * 0.5);
        }
        else if (quantityOfA > 15 && quantityOfC > 15) {
            discount = ((quantityOfA - 15) * (costOfProductA) * 0.5) + ((quantityOfC - 15) * (costOfProductC) * 0.5);
        }
        else if (quantityOfC > 15 && quantityOfB > 15) {
            discount = ((quantityOfC - 15) * (costOfProductC) * 0.5) + ((quantityOfB - 15) * (costOfProductB) * 0.5);
        }
        else if (quantityOfA > 15) {
            discount = ((quantityOfA - 15) * (costOfProductA) * 0.5);
        }
        else if (quantityOfB > 15) {
            discount = ((quantityOfB - 15) * (costOfProductB) * 0.5);
        }
        else if (quantityOfC > 15) {
            discount = ((quantityOfC - 15) * (costOfProductC) * 0.5);
        }
    }
    return discount;
}

