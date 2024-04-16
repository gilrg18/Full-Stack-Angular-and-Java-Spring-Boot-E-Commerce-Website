package com.gilrg.ecommerce.service;

import com.gilrg.ecommerce.dto.Purchase;
import com.gilrg.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
