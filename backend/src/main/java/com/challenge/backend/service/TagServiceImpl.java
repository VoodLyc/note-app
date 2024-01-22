package com.challenge.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.challenge.backend.exception.ResourceNotFoundException;
import com.challenge.backend.model.Tag;
import com.challenge.backend.repository.TagRepository;

@Service
public class TagServiceImpl implements TagService {
	
	@Autowired
	TagRepository tagRepository;

	@Override
	public List<Tag> getTags() {
		return tagRepository.findAll();
	}

	@Override
	public Tag getTag(int id) {
		Optional<Tag> tag = tagRepository.findById(id);
		if (tag.isPresent()) {
			return tag.get();
		}
		throw new ResourceNotFoundException("A tag of id " + id +  " does not exists");
	}

	@Override
	public Tag saveTag(Tag tag) {
		return tagRepository.save(tag);
	}

	@Override
	public Tag updateTag(Tag tag) {
		Optional<Tag> tagOptional = tagRepository.findById(tag.getId());
		if (tagOptional.isPresent()) {
			Tag updatedTag = tagOptional.get();
			updatedTag.setName(tag.getName());
			return tagRepository.save(updatedTag);
		}
		throw new ResourceNotFoundException("A tag of id " + tag.getId() +  " does not exists");
	}

	@Override
	public void deleteTag(int id) {
		this.tagRepository.deleteById(id);
	}

}
