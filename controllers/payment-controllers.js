


// const pay =  async(req,res)=>{
//     const user = req.body.userld;
//     const Price = req.body.price;
//     const Quantity = req.body.quantity;
//     const totalPrice = Price * Quantity;

//     paystack.transaction.initialize({
//         amount: 10000, // amount in kobo
//         email: req.body.email,
//         callback_url: `http://localhost:3000/callback`
//       }).then(response => {
//           res.redirect(response.data.authorization_url);
//       });
      
    
// }

//  const callback = async(req,res)=>{
//     paystack.transaction.verify(req.query.reference).then(response => {
//         if(response.data.status === 'success'){
//          // Payment is successful, you can proceed to update your database, send an email to the customer, or take any other necessary action.
//         }
//       });
//  }

// module.exports = {pay,
// callback}