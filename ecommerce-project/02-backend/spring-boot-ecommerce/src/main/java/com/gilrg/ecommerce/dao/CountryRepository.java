package com.gilrg.ecommerce.dao;

import com.gilrg.ecommerce.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

//Country has @RepositoryRestResource annotation, so it will be exposed as REST API endpoint
@RepositoryRestResource(collectionResourceRel = "countries", path="countries")
public interface CountryRepository extends JpaRepository<Country, Integer> {
}
