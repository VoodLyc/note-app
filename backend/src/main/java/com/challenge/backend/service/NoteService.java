package com.challenge.backend.service;

import java.util.List;

import com.challenge.backend.model.Note;

public interface NoteService {
	
	List<Note> getNotes();
	
	Note getNote(int id);
	
	Note saveNote(Note note);
	
	Note updateNote(Note note);
	
	void deleteNote(int id);
	
	List<Note> findByActive(boolean active);
	
	List<Note> finByTags(List<Integer> tags);
}
