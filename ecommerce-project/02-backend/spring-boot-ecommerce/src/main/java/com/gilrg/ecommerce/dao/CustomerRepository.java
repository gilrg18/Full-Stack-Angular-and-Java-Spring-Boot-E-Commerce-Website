package com.gilrg.ecommerce.dao;


import com.gilrg.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

//CustomerRepository is NOT annotated, hence it will NOT be exposed as REST API based on our configurations
//Since @RepositoryRestResource is missing, trying to access this endpoint will show 404 not found 
public interface CustomerRepository extends JpaRepository <Customer, Long> {

    Customer findByEmail(String theEmail);
    //bts, spring will execute a query similar to:
    //select * from customer c where c.email = theEmail;
    //returns null if not found
}
