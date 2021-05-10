package com.example.samples.course.web;

import com.example.samples.course.domain.Course;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/courses")

public class CourseController {
    private static final Logger logger = LoggerFactory.getLogger(CourseController.class);
    private CrudRepository<Course, String> repository;

    @Autowired
    public CourseController(CrudRepository<Course, String> repository) {
        this.repository = repository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Course> courses() {
        return repository.findAll();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Course add(@RequestBody @Valid Course course) {
        logger.info("Adding course " + course.getId());
        return repository.save(course);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Course update(@RequestBody @Valid Course course) {
        logger.info("Updating course " + course.getId());
        return repository.save(course);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Course getById(@PathVariable String id) {
        logger.info("Getting course " + id);
        return repository.findById(id).orElse(null);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteById(@PathVariable String id) {
        logger.info("Deleting course " + id);
        repository.deleteById(id);
    }
}
