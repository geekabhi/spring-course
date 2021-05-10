package com.example.samples.course;

import com.example.samples.course.repositories.CourseRepositoryPopulator;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        new SpringApplicationBuilder(Application.class)
                .listeners(new CourseRepositoryPopulator())
                .application()
                .run(args);
    }
}
