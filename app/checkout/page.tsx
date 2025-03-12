import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./order-summary";

export default function CheckoutPage() {
  return (
    <div>
      <h1>Checkout</h1>
      <OrderSummary />
      <CheckoutForm />
    </div>
  );
}
