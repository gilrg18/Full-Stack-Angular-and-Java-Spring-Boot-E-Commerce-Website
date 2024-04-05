package com.gilrg.ecommerce.dao;

import com.gilrg.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

//JpaRepository<Entity, Primary key>
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
    //findBy(querymethod), CategoryId(match by category id), @Param("id")(Use this parameter value)
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
    //Behind the Scenes, Spring will execute a query similiar to:
    //SELECT * FROM product where category_id = ?
    //Spring Data Rest automatically exposes endpoint:
    //http://localhost:8080/api/products/search/findByCategoryId?id=?
    //Also, the "/search" is provided by Spring Data REST.
    // By default, any finder method defined in the repository will be exposed as an API.
}
