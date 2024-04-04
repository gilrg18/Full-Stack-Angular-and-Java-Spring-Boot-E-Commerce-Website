package com.gilrg.ecommerce.dao;

import com.gilrg.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
//JpaRepository<Entity, Primary key>
public interface ProductRepository extends JpaRepository<Product, Long> {
}
