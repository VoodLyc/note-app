package com.challenge.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.challenge.backend.exception.ResourceNotFoundException;
import com.challenge.backend.model.Note;
import com.challenge.backend.repository.NoteRepository;

@Service
public class NoteServiceImpl implements NoteService {
	
	@Autowired
	private NoteRepository noteRepository;

	@Override
	public List<Note> getNotes() {
		return noteRepository.findAll();
	}

	@Override
	public Note getNote(int id) {
		Optional<Note> note = noteRepository.findById(id);
		if (note.isPresent()) {
			return note.get();
		}
		throw new ResourceNotFoundException("A note of id " + id +  " does not exists");
	}
	
	@Override
	public Note saveNote(Note note) {
		return noteRepository.save(note);
	}

	@Override
	public Note updateNote(Note note) {
		Optional<Note> OptionalNote = noteRepository.findById(note.getId());
		if (OptionalNote.isPresent()) {
			Note updatedNote = OptionalNote.get();
			updatedNote.setTitle(note.getTitle());
			updatedNote.setContent(note.getContent());
			updatedNote.setActive(note.isActive());
			updatedNote.setTags(note.getTags());
			return noteRepository.save(updatedNote);
		}
		throw new ResourceNotFoundException("A note of id " + note.getId() +  " does not exists");
	}
	
	@Override
	public void deleteNote(int id) {
		noteRepository.deleteById(id);
	}

	@Override
	public List<Note> findByActive(boolean active) {
		return noteRepository.findByActive(active);
	}

	@Override
	public List<Note> finByTags(List<Integer> tags) {
		return noteRepository.findByTags(tags);
	}
}
