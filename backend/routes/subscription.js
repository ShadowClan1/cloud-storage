const app = require("express").Router();
const fss = require("fs/promises");
const auth = require("../middlewares/auth");



app.use(auth);
app.post("/create-subscription", async (req, res) => {
  // Simulate authenticated user. In practice this will be the
  // Stripe Customer ID related to the authenticated user.
  const customerId = CONFIG.CUSTOMER_ID;

  // Create the subscription
  const priceId = CONFIG.PRICE_ID;

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    // console.log(subscription.latest_invoice.payment_intent);
    res.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      paymentIntentStatus : subscription.latest_invoice.payment_intent.status
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

const endpointSecret =
  "whsec_4ad56df0262f8e85c5eaa5d7945272b3eeaa0ca46d8ba731c555fe2c390b7d6b";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;
    

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log(event.type)
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
// console.log(event.data.object)
// return response.status(200).json({success :true})
    // Handle the event
    switch (event.type) {
      case "customer.created":
        const customerCreated = event.data.object;
        // Then define and call a function to handle the event customer.created
        break;
      case "customer.subscription.created":
        const customerSubscriptionCreated = event.data.object;
        // const customerSubscriptionCreated = subObject;
        let latest_invoice = await Invoice.findOne({
          inv_id: customerSubscriptionCreated.latest_invoice,
        });
        const sub = Subscription.create({
          sub_id: customerSubscriptionCreated.id,
          createdAt: customerSubscriptionCreated.created ,
          current_period_start:
            customerSubscriptionCreated.current_period_start *1000,
          current_period_end: customerSubscriptionCreated.current_period_end *1000,
          customer_id: customerSubscriptionCreated.customer,

          currency: customerSubscriptionCreated.currency,
          collection_method: customerSubscriptionCreated.collection_method,
          default_payment_method:
            customerSubscriptionCreated.default_payment_method,
          latest_invoice: latest_invoice?._id,
          invoices: [latest_invoice?._id],
          status: customerSubscriptionCreated.status,
        });

        // Then define and call a function to handle the event customer.subscription.created
        break;
      case "customer.subscription.deleted":
        // const customerSubscriptionDeleted = subObject;
        const customerSubscriptionDeleted = event.data.object;
        await Subscription.updateOne(
          { sub_id: customerSubscriptionDeleted.id },
          {
            cancel_at: customerSubscriptionDeleted.cancel_at *1000,
            status: customerSubscriptionDeleted.status,
          }
        );

        // Then define and call a function to handle the event customer.subscription.deleted
        break;
      case "customer.subscription.updated":
        // const customerSubscriptionUpdated = subObject;
        const customerSubscriptionUpdated = event.data.object;
  let        latest_invoice_ = await Invoice.findOne({
          inv_id: customerSubscriptionUpdated.latest_invoice,
        });

        await Subscription.updateOne(
          { sub_id: customerSubscriptionUpdated.id },
          {
            cancel_at_period_end:
              customerSubscriptionUpdated.cancel_at_period_end ,
            current_period_end: customerSubscriptionUpdated.current_period_end *1000,
            current_period_start:
              customerSubscriptionUpdated.current_period_start *1000,
            status: customerSubscriptionUpdated.status,
            collection_method: customerSubscriptionUpdated.collection_method,
            default_payment_method:
            customerSubscriptionUpdated.default_payment_method,
            latest_invoice: latest_invoice_._id,
          }
        );
        // Then define and call a function to handle the event customer.subscription.updated
        break;
      case "invoice.created":
        // const invoiceCreated = invObject;
        const invoiceCreated = event.data.object;
        // let customer_invoice = await 
        let plan_invoice = await Plan.findOne({prod_id : invoiceCreated.lines.data[0].price.product})
        let price_invoice = await Price.findOne({price_id : invoiceCreated.lines.data[0].price.product})
let invoice = await Invoice.create({
  inv_id : invoiceCreated.id,
  amount_due : invoiceCreated.amount_due,
  amount_paid : invoiceCreated.amount_paid,
  amount_remaining :invoiceCreated.amount_remaining,
  attempted_count : invoiceCreated.attempt_count,
   customer : invoiceCreated.customer,
   prod_id : plan_invoice?._id,
  price_id : price_invoice?._id,
     status : invoiceCreated.status,
     total : invoiceCreated.total
  
})

        // Then define and call a function to handle the event invoice.created
        break;
      case "invoice.finalization_failed":
        const invoiceFinalizationFailed = event.data.object;
        // Then define and call a function to handle the event invoice.finalization_failed
        break;
      case "invoice.finalized":
        const invoiceFinalized = event.data.object;
        // Then define and call a function to handle the event invoice.finalized
        break;
      case "invoice.paid":
  
        const invoicePaid = event.data.object;
const paidInvoice = await Invoice.findOneAndUpdate({inv_id : invoicePaid.id},{
  status : invoicePaid.status,
  amount_due : invoicePaid.amount_due,
  amount_paid : invoicePaid.amount_paid,
  amount_remaining : invoicePaid.amount_remaining
});

        // Then define and call a function to handle the event invoice.paid
        break;
      case "invoice.payment_action_required":
        const invoicePaymentActionRequired = event.data.object;
        // action required to develope
        // Then define and call a function to handle the event invoice.payment_action_required
        break;
      case "invoice.payment_failed":
        const invoicePaymentFailed = event.data.object;
        // Then define and call a function to handle the event invoice.payment_failed
        break;
      case "invoice.upcoming":
        const invoiceUpcoming = event.data.object;
        // Then define and call a function to handle the event invoice.upcoming
        break;
      case "invoice.updated":
        // const invoiceUpdated = invObject;
        const invoiceUpdated = event.data.object;

        const updatedInvoice = await Invoice.findOneAndUpdate({inv_id : invoiceUpdated.id},{
          status : invoiceUpdated.status,
          amount_due : invoiceUpdated.amount_due,
          amount_paid : invoiceUpdated.amount_paid,
          amount_remaining : invoiceUpdated.amount_remaining
        });
        // Then define and call a function to handle the event invoice.updated
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.status(200).json({success :true});
  }
);



app.get("/subscriptionPlans", async (req, res) => {});




module.exports = app;
