"use strict";

const { StrikethroughSSharp, StraightenSharp } = require("@material-ui/icons");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const stripe = require("stripe")(
  "sk_test_51MMecvCCDjBjoTBIl5VBMxH18Zi6hobPOx2Km1pd5nAaXeBMZJlbNuCJie4xTrKnRqQlUGPXoInYk303QdMtv1UA00DjuhBWnk"
);

module.exports = {
  // 注文を作成する
  create: async (ctx) => {
    const { address, amount, dishes, token } = JSON.parse(ctx.request.body);
    const charge = await stripe.charges.create({
      amount: amount,
      currency: "jpy",
      source: token,
      description: `Oder ${new Date()} by ${ctx.state.user._id}`,
    });

    const oder = await strapi.services.oder.create({
      user: ctx.state.user._id,
      charge_id: charge.id,
      amount: amount,
      address,
      dishes,
    });

    return oder;
  },
};
