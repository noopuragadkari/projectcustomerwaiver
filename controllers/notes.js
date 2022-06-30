const Customer = require('../models/customer');

module.exports = {
  create,
  delete : deleteNote
};

function create(req, res) {
    // Find the customer to embed the note within
    Customer.findById(req.params.id, function(err, customer) {
      // Push the subdoc for the note
      customer.notes.push(req.body);
      customer.save(function(err) {
        console.log(customer)
        res.redirect(`/customers/${customer._id}`);
      });
    });
  }
  function deleteNote(req, res, next) {
    Customer.findOne({'notes._id': req.params.id}).then(function(customer) {
      const note = customer.notes.id(req.params.id);
      note.remove();
      customer.save().then(function() {
        res.redirect(`/customers/${customer._id}`);
      }).catch(function(err) {
        return next(err);
      });
    });
  }