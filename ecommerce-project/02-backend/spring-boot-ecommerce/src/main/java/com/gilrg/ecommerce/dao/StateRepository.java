package com.gilrg.ecommerce.dao;

import com.gilrg.ecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

//JpaRepository<EntityClass, PrimaryKey>
@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Integer> {

    //Retrieve states for a given country
    //http://localhost:8080/api/states/search/findByCountryCode?code=IN
    List<State> findByCountryCode(@Param("code") String code);
}
