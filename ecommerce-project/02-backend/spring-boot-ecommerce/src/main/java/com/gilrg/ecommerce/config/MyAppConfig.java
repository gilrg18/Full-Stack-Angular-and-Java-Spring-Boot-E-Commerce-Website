package com.gilrg.ecommerce.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//@Configuration allows this class to be picked during component scanning and
//this configuration will be applied accordingly
@Configuration
public class MyAppConfig implements WebMvcConfigurer {
    @Value("${allowed.origins}")
    private String[] theAllowedOrigins;

    @Value("${spring.data.rest.base-path}")
    private String basePath;

    @Override
    public void addCorsMappings(CorsRegistry cors) {
        //set up cors mapping
        cors.addMapping(basePath + "/**").allowedOrigins(theAllowedOrigins);
    }
}
