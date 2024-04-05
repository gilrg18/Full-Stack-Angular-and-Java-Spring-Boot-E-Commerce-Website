package com.gilrg.ecommerce.dao;

import com.gilrg.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

//name of json entry="productCategory", path=/product-category
@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory", path ="product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
