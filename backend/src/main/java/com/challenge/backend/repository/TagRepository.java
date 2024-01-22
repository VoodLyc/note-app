package com.challenge.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.challenge.backend.model.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer> {

}
