const { Images } = require("openai/resources/images.mjs");

require("dotenv").config();
const key=process.env.STRIPE_SECRET_KEY;
const stripe=require("stripe")(key)




const Checkout = async (req, res) => {
    try{
         const lineItems={
        price_data:{
            currency:"usd",
            unit_amount:1200,
            product_data:{
                name:"consultation name",
                description:"motif de consultation",
                images:"https://img.freepik.com/vecteurs-premium/femme-patiente-consultant-medecin-illustration-vectorielle-hopital-concept-consultation-medecin_36358-174.jpg"
            }
        },
        quantity:1200
     }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: await Promise.all(lineItems),
        success_url: `${process.env.CLIENT_SITE_URL}/success`,
        cancel_url: `${process.env.CLIENT_SITE_URL}/cancel`,
      });
      res.json({url:session.url})
    }
    catch(error) {
        console.log(error);
        res.status(500).json({"internal server error":error})
    }
    
  };


  module.exports={Checkout}

