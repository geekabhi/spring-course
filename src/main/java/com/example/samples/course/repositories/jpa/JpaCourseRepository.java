package com.example.samples.course.repositories.jpa;

import com.example.samples.course.domain.Course;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Profile({"!mongodb", "!redis"})
public interface JpaCourseRepository extends JpaRepository<Course, String> {
    
}
