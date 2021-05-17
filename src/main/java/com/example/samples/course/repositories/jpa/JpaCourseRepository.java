package com.example.samples.course.repositories.jpa;

import com.example.samples.course.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaCourseRepository extends JpaRepository<Course, String> {
    
}
