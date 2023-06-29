const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


class MainController {
  stripeCheckout = async (req, res, next) => {
    try {
      const { amount } = req.body;

      if (!amount) {
        return res.status(400).json({ error: "Amount is required" });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "qpayment",
              },
              unit_amount: amount * 100, // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "https://www.google.com/",  
        cancel_url: "https://twitter.com/",
      });

      res.json({ url: session.url });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = new MainController();
