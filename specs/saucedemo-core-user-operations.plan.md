# SauceDemo Core User Operations Test Plan

## Application Overview

Functional test plan for the SauceDemo e-commerce demo at https://www.saucedemo.com. Exploration confirmed a signed-out login form with documented demo credentials; a six-item catalog with name and price sorting; product detail and cart actions; checkout information fields (First Name, Last Name, Zip/Postal Code); an order overview with payment, shipping, subtotal, tax, and total; and a completion page. Use standard_user / secret_sauce for normal shopper flows. Each scenario starts independently with a fresh browser context, signed-out session, and empty cart. Do not depend on another scenario's data. The demo has no real payment step.

## Test Scenarios

### 1. Core Shopper Operations

**Seed:** `tests/seed.spec.ts`

#### 1.1. Sign in and handle invalid credentials

**File:** `tests/saucedemo/sign-in.spec.js`

**Steps:**
  1. Starting state: Open https://www.saucedemo.com in a fresh browser context with no active session.
    - expect: The Swag Labs login form is displayed with Username, Password, and Login controls.
    - expect: The page lists standard_user among accepted usernames and shows secret_sauce as the demo password.
  2. Enter an invalid username and password, then select Login.
    - expect: An authentication error is shown and the user remains on the login page.
    - expect: Fail if an invalid credential pair opens the catalog or no actionable error is presented.
  3. Replace the values with standard_user and secret_sauce, then select Login.
    - expect: The user is authenticated and redirected to the Products catalog at /inventory.html.
    - expect: The catalog displays the six available products and a cart control.
    - expect: Fail if valid documented credentials are rejected or the catalog is unavailable.

#### 1.2. Browse, sort, and inspect products

**File:** `tests/saucedemo/product-discovery.spec.js`

**Steps:**
  1. Starting state: Open the site in a fresh signed-out context and sign in as standard_user using secret_sauce.
    - expect: The Products catalog is displayed with six products and a Sort products control.
  2. Choose Price (low to high) in the sort control.
    - expect: Products are ordered by non-decreasing price; Sauce Labs Onesie ($7.99) is first and Sauce Labs Fleece Jacket ($49.99) is last.
    - expect: Fail if the selected order is not applied or a product is missing.
  3. Choose Name (Z to A), then open the Sauce Labs Backpack product details.
    - expect: The catalog reflects descending product-name order.
    - expect: The Backpack detail view shows its name, description, $29.99 price, Add to cart action, and Back to products action.
  4. Select Back to products.
    - expect: The Products catalog is displayed again and remains usable.
    - expect: Fail if returning from product details loses the catalog or causes an error.

#### 1.3. Manage the shopping cart

**File:** `tests/saucedemo/cart-management.spec.js`

**Steps:**
  1. Starting state: Open the site in a fresh signed-out context and sign in as standard_user using secret_sauce.
    - expect: The Products catalog is displayed and the cart is empty.
  2. Add Sauce Labs Backpack and Sauce Labs Onesie to the cart from the catalog.
    - expect: Each selected product's action changes to Remove after it is added.
    - expect: The cart badge indicates two items.
    - expect: Fail if the badge count or add/remove state does not match the selected products.
  3. Open the cart and review its contents.
    - expect: Your Cart lists the Backpack and Onesie with quantity 1 each and their expected prices ($29.99 and $7.99).
    - expect: Checkout and Continue Shopping actions are available.
  4. Remove the Backpack from the cart.
    - expect: The Backpack is removed while the Onesie remains; the cart badge indicates one item.
    - expect: Fail if removal clears the wrong item, leaves the removed item visible, or changes the remaining item's quantity.
  5. Select Continue Shopping, then return to the cart.
    - expect: The catalog is reachable and the remaining cart state is retained.
    - expect: The cart contains only the Onesie and its badge indicates one item.

#### 1.4. Validate checkout information

**File:** `tests/saucedemo/checkout-validation.spec.js`

**Steps:**
  1. Starting state: Open the site in a fresh signed-out context, sign in as standard_user using secret_sauce, add the Sauce Labs Backpack, and open the cart.
    - expect: The cart contains one Backpack and Checkout is available.
  2. Select Checkout, then select Continue without entering any customer information.
    - expect: The page remains on Checkout: Your Information and shows an inline required-field error for First Name.
    - expect: Fail if checkout advances or the missing required information is not identified.
  3. Enter a first name only and select Continue; then enter the last name and select Continue without a ZIP/postal code.
    - expect: The first submission identifies Last Name as required.
    - expect: The second submission identifies Zip/Postal Code as required.
    - expect: The user remains on the information form after each incomplete submission.
  4. Enter Taylor as First Name, Tester as Last Name, and 10001 as Zip/Postal Code, then select Continue.
    - expect: The user advances to Checkout: Overview.
    - expect: The overview contains the Backpack, payment and shipping information, item total, tax, total, Cancel, and Finish controls.
    - expect: Fail if valid required fields are rejected or the order overview omits the cart item or totals.

#### 1.5. Review and place an order

**File:** `tests/saucedemo/order-completion.spec.js`

**Steps:**
  1. Starting state: Open the site in a fresh signed-out context, sign in as standard_user using secret_sauce, add one Sauce Labs Backpack, open the cart, select Checkout, enter Taylor / Tester / 10001, and select Continue.
    - expect: Checkout: Overview is displayed with one Backpack at $29.99.
    - expect: The overview shows SauceCard #31337, Free Pony Express Delivery, item total $29.99, tax $2.40, and total $32.39.
    - expect: Fail if the line item or calculated totals do not match the displayed cart contents.
  2. Select Finish to place the demo order.
    - expect: The Checkout: Complete! page displays Thank you for your order! and the dispatch confirmation message.
    - expect: The cart is empty after completion.
    - expect: Fail if the app does not show a completion confirmation or the completed order remains in the cart.
  3. Select Back Home.
    - expect: The Products catalog is displayed and the cart remains empty.
    - expect: Fail if the user cannot return to the catalog after completion.
