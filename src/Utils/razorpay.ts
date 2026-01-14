export const openRazorpay = (
  payment: any,
  onProcessing?: () => void,
  onComplete?: (response: any) => void,
  onClose?: () => void
) => {
  const options = {
    key: payment.key,
    amount: payment.amount * 100,
    currency: "INR",
    name: "My Store",
    description: "Order Payment",
    order_id: payment.razorpayOrderId,

    handler: async function (response: any) {
      console.log("Razorpay success:", response);
      onProcessing?.();
      onComplete?.(response);
    },

    modal: {
      ondismiss: function () {
        console.log("Razorpay popup closed");
        onClose?.();
      },
    },

    prefill: {
      name: payment.customerName ?? "Test User",
      email: payment.email ?? "test@example.com",
      contact: payment.contact ?? "9999999999",
    },

    notes: {
      appOrderId: payment.orderId,
      razorpayOrderId: payment.razorpayOrderId,
    },

    theme: {
      color: "#4f46e5",
    },
  };

  const razorpay = new (window as any).Razorpay(options);
  razorpay.open();
};
