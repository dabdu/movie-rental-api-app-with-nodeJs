const express = require('express');
const {Rental, validate} = require('../models/rental');
const {Customer} = require('../models/customer')
const {Movie} = require('../models/movie')
const router = express.Router();
const Fawn = require('fawn');
const mongoose = require('mongoose');
Fawn.init(mongoose);

router.post('', async(req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Getting the Customer Info
    const customer = await Customer.findById(req.body.customerId);
    // if Customer doesn't exist
    if(!customer) return res.status(404).send('Customer Not Found');

    // Getting the Customer Info
    const movie = await Movie.findById(req.body.movieId);
    // if movie doesn't exist
    if(!movie) return res.status(404).send('movie Not Found');

    returnedDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const rental = new Rental({
        customer: {
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie:{
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
            rentalFees: movie.rentalFees
        },
        dateReturned: returnedDate
    });
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc:{
                    numberInStock: -1
                }
            })
            .run()

            res.send(rental)
    } catch (error) {
        res.status(500).send('Internal Sever Error');
    }
});
module.exports = router;