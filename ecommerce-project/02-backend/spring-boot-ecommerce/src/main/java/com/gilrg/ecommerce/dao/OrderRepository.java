package com.gilrg.ecommerce.dao;

import com.gilrg.ecommerce.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByCustomerEmailOrderByDateCreatedDesc(@Param("email")String email, Pageable pageable);
    //Springboot will generate the query based on the method name (findByCustomerEmailOrderByDateCreatedDesc)
    //Select * from orders
    //left outer join customer
    //on orders.customer_id=customer.id
    //where customer.email =: email
    //order by orders.date_created desc
}
