const Customer = require('../models/customer');

function newCustomer(req, res) {
  res.render('customers/new', { title: 'Add Customer',message : req.flash('message') });
}
function index(req, res) {
  Customer.find({}, function(err, customers) {
    res.render('customers/index', { title: 'All Customers', customers, message : req.flash('message') });
  });
}
function show(req, res) {
  Customer.findById(req.params.id, function(err, customer) {
    res.render('customers/show', { title: 'Customer Details', customer });
  });
}
function create(req, res){
  // we create the customer object
  const  customer = new Customer(req.body);
  // we save the customer object to the db
  customer.save(function (error){
     // if(error) return res.render('customers/new');
    //  console.log(customer);
     // req.flash('message','saved...');
     // res.redirect(`/customers`);
     if(!error){
      console.log(customer);
      req.flash('message','Customer Added successfully!');
      res.redirect(`/customers`);
     }
     else{
      res.send(error.message);
     }
  });
}
function edit(req, res) {
  Customer.findOne({_id: req.params.id}, function(err, customer) {
    if (err || !customer) return res.redirect('/customers');
    res.render('customers/edit', {customer,message : req.flash('message')});
  });
}
function update(req, res) {
  Customer.findOneAndUpdate(
    {_id: req.params.id},
    // update object with updated properties
    req.body,
    // options object with new: true to make sure updated doc is returned
    {new: true},
    function(err, customer) {
      if (err || !customer) return res.redirect('/customers');
      req.flash('message','Record updated!');
      res.redirect(`/customers`);
    }
  );
}
function deleteCustomer(req, res) {
  Customer.findOneAndDelete(
    {_id: req.params.id}, function(err) {
      req.flash('message','Record deleted!');
      res.redirect('/customers');
    }
  );
}


module.exports = {
  new: newCustomer,
  create,
  index,
  show,
  edit,
  update,
  delete: deleteCustomer 
};
