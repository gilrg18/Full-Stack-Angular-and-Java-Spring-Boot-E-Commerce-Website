package com.gilrg.ecommerce.dto;

import com.gilrg.ecommerce.entity.Address;
import com.gilrg.ecommerce.entity.Customer;
import com.gilrg.ecommerce.entity.Order;
import com.gilrg.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
