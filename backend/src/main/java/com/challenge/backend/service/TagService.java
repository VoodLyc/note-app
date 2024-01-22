package com.challenge.backend.service;

import java.util.List;

import com.challenge.backend.model.Tag;

public interface TagService {
	
	List<Tag> getTags();
	
	Tag getTag(int id);
	
	Tag saveTag(Tag tag);
	
	Tag updateTag(Tag tag);
	
	void deleteTag(int id);
}
