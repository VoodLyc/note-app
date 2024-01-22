package com.challenge.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.challenge.backend.model.Note;
import java.util.List;



public interface NoteRepository extends JpaRepository<Note, Integer> {
	
	List<Note> findByActive(boolean active);
	
	@Query("SELECT DISTINCT n FROM Note n JOIN n.tags t WHERE t IN :tags")
	List<Note> findByTags(List<Integer> tags);
}
