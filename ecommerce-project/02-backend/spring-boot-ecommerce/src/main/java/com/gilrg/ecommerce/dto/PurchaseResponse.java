package com.gilrg.ecommerce.dto;

import lombok.Data;

@Data //data will generate constructor for FINAL fields
public class PurchaseResponse {
    private final String orderTrackingNumber;

}
