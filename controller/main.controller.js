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
        // On your local machine
        success_url: "http://localhost:3000/success",  
        cancel_url: "https://localhost:3000/error",

        // On your deployed link ( right now its mine when you deployed yours then you need to change it again)
        // success_url: "https://qpayment.netlify.app/success",    
        // cancel_url: "https://qpayment.netlify.app/error",
      });

      res.json({ url: session.url });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = new MainController();
