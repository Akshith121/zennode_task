import java.util.InputMismatchException;
import java.util.Scanner;

public class Zennode_Task_1 {
    public static void main(String[] args) throws Exception{
        int costOfProductA = 20;
        int costOfProductB = 40;
        int costOfProductC = 50;
        int costOfGiftWrap = 1;
        int costOfShipping = 5;
        int giftWrapFee = 0;
        int shippingFee = 0;

        Scanner sc = new Scanner(System.in);

        try{
            System.out.println("How many units of product A, do you want?");
            int quantityOfA = sc.nextInt();
            if(quantityOfA < 0){
                throw new Exception("Number of units cannot be negative");
            }
            String wrapA = "";
            if(quantityOfA > 0){
                System.out.println("Do you want them to be wrapped as a gift? (yes/no)");
                wrapA += sc.next();
            }

            System.out.println("How many units of product B, do you want?");
            int quantityOfB = sc.nextInt();
            if(quantityOfB < 0){
                throw new Exception("Number of units cannot be negative");
            }
            String wrapB = "";
            if(quantityOfB > 0){
                System.out.println("Do you want them to be wrapped as a gift? (yes/no)");
                wrapB += sc.next();
            }

            System.out.println("How many units of product C, do you want?");
            int quantityOfC = sc.nextInt();
            if(quantityOfC < 0){
                throw new Exception("Number of units cannot be negative");
            }
            String wrapC = "";
            if(quantityOfC > 0){
                System.out.println("Do you want them to be wrapped as a gift? (yes/no)");
                wrapC += sc.next();
            }

            if(wrapA.equals("Yes") || wrapA.equals("yes")){
                giftWrapFee += quantityOfA*costOfGiftWrap;
            }
            if(wrapB.equals("Yes") || wrapB.equals("yes")){
                giftWrapFee += quantityOfB*costOfGiftWrap;
            }
            if(wrapC.equals("Yes") || wrapC.equals("yes")){
                giftWrapFee += quantityOfC*costOfGiftWrap;
            }

            int totalQuantity = quantityOfA + quantityOfB + quantityOfC;
            int numberOfPackages = 0;
            if(totalQuantity%10 == 0){
                numberOfPackages = totalQuantity/10;
            }
            else{
                numberOfPackages = totalQuantity/10 + 1;
            }
            shippingFee = numberOfPackages*costOfShipping;

            int totalCostOfA = quantityOfA*costOfProductA;
            int totalCostOfB = quantityOfB*costOfProductB;
            int totalCostOfC = quantityOfC*costOfProductC;
            int subTotal = (totalCostOfA + totalCostOfB + totalCostOfC);
            float total = 0;

            System.out.println("product A" + " - " + quantityOfA + "units" + " - $" + totalCostOfA);
            System.out.println("product B" + " - " + quantityOfB + "units" + " - $" + totalCostOfB);
            System.out.println("product C" + " - " + quantityOfC + "units" + " - $" + totalCostOfC);

            System.out.println("subTotal" + " - $" + subTotal);

            float flat_10_discount = getFlat_10_discount(subTotal);
            float bulk_5_discount = getBulk_5_discount(quantityOfA, totalCostOfA, quantityOfB, totalCostOfB, quantityOfC, totalCostOfC);
            float bulk_10_discount = getBulk_10_discount(totalQuantity, subTotal);
            float tiered_50_discount = getTiered_50_discount(totalQuantity, quantityOfA, quantityOfB, quantityOfC, costOfProductA, costOfProductB, costOfProductC);

            total += subTotal;
            if(flat_10_discount != 0){
               if(flat_10_discount >= bulk_5_discount && flat_10_discount >= bulk_10_discount && flat_10_discount >= tiered_50_discount){
                  System.out.println("flat_10_discount" + " - $" + flat_10_discount);
                  total -= flat_10_discount;
               }
               else if(bulk_5_discount >= flat_10_discount && bulk_5_discount >= bulk_10_discount && bulk_5_discount >= tiered_50_discount){
                  System.out.println("bulk_5_discount" + " - $" + bulk_5_discount);
                  total -= bulk_5_discount;
               }
               else if(bulk_10_discount >= flat_10_discount && bulk_10_discount >= bulk_5_discount && bulk_10_discount >= tiered_50_discount){
                  System.out.println("bulk_10_discount" + " - $" + bulk_10_discount);
                  total -= bulk_10_discount;
               }
               else{
                  System.out.println("tiered_50_discount" + " - $" + tiered_50_discount);
                  total -= tiered_50_discount;
               }
            }
            else{
               System.out.println("You haven't bought enough to avail discount");
            }

            total += (shippingFee + giftWrapFee);

            System.out.println("Shipping Fee" + " - $" + shippingFee + " " + "Gift wrap Fee" + " - $" + giftWrapFee);
            System.out.println("Total amount" + " - $" + total);
            
        }catch(InputMismatchException e){
            throw new InputMismatchException("Please enter a valid input");
        }
    }

    //flat_10_discount
    public static float getFlat_10_discount(int subTotal){
        float discount = 0;
        if(subTotal > 200){
            discount = (subTotal*0.1f);
        }
        return discount;
    }

    //bulk_5_discount
    public static float getBulk_5_discount(int aQ, int aC, int bQ, int bC, int cQ, int cC){
        float discount = 0;
        if(aQ > 10){
            discount += (aC*0.05);
        }
        if(bQ > 10){
            discount += (bC*0.05);
        }
        if(cQ > 10){
            discount += (cC*0.05);
        }
        return discount;
    }

    //bulk_10_discount
    public static float getBulk_10_discount(int totalQuantity, int subTotal){
        float discount = 0;
        if(totalQuantity > 20){
            discount = (subTotal*0.1f);
        }
        return discount;
    }

    //tiered_50_discount
    public static float getTiered_50_discount(int totalQuantity, int quantityOfA, int quantityOfB, int quantityOfC, int costOfProductA, int costOfProductB, int costOfProductC) {
        float discount = 0;
        if (totalQuantity > 30) {
            if (quantityOfA > 15 && quantityOfB > 15 && quantityOfC > 15) {
                discount = ((quantityOfA - 15) * (costOfProductA) * 0.5f) + ((quantityOfB - 15) * (costOfProductB) * 0.5f) + ((quantityOfC - 15) * (costOfProductC) * 0.5f);
            }
            else if (quantityOfA > 15 && quantityOfB > 15) {
                discount = ((quantityOfA - 15) * (costOfProductA) * 0.5f) + ((quantityOfB - 15) * (costOfProductB) * 0.5f);
            }
            else if (quantityOfA > 15 && quantityOfC > 15) {
                discount = ((quantityOfA - 15) * (costOfProductA) * 0.5f) + ((quantityOfC - 15) * (costOfProductC) * 0.5f);
            }
            else if (quantityOfC > 15 && quantityOfB > 15) {
                discount = ((quantityOfC - 15) * (costOfProductC) * 0.5f) + ((quantityOfB - 15) * (costOfProductB) * 0.5f);
            }
            else if (quantityOfA > 15) {
                discount = ((quantityOfA - 15) * (costOfProductA) * 0.5f);
            }
            else if (quantityOfB > 15) {
                discount = ((quantityOfB - 15) * (costOfProductB) * 0.5f);
            }
            else if (quantityOfC > 15) {
                discount = ((quantityOfC - 15) * (costOfProductC) * 0.5f);
            }
        }
        return discount;
    }
}
