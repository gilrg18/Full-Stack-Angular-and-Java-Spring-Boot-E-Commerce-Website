package com.gilrg.ecommerce.service;

import com.gilrg.ecommerce.dao.CustomerRepository;
import com.gilrg.ecommerce.dto.Purchase;
import com.gilrg.ecommerce.dto.PurchaseResponse;
import com.gilrg.ecommerce.entity.Order;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    @Autowired //autowired is optional since we only have one constructor
    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        //retrieve the order info from dto
        Order order = purchase.getOrder();

        //generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        //populate order with orderItems

        //populate order with billingAddress and shippingAddress

        //populate customer with order

        //save to the database

        //return a response
        return null;
    }

    private String generateOrderTrackingNumber() {
        //generate a random UUID number (UUID version-4(random)) (Universal unique identifier)
        //the probability of collision is VERY LOW ...neglible
        //However, if you need absoluto 0% collision you could:
        //1-generate UUID, 2-query db to see if UUID has been used by your app, 3-if UUID found, repeat step 1 and 2
    }
}
