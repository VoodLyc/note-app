package com.challenge.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.challenge.backend.model.Tag;
import com.challenge.backend.service.TagService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/tags")
public class TagController {
	
	@Autowired
	TagService tagService;
	
	@GetMapping
	public ResponseEntity<List<Tag>> getTags() {
		return new ResponseEntity<List<Tag>>(this.tagService.getTags(), HttpStatus.OK);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Tag> getTag(@PathVariable int id) {
		return new ResponseEntity<Tag>(this.tagService.getTag(id), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Tag> saveTag(@RequestBody Tag tag) {
		return new ResponseEntity<Tag>(this.tagService.saveTag(tag), HttpStatus.CREATED);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Tag> updateTag(@RequestBody Tag tag, @PathVariable int id) {
		tag.setId(id);
		return new ResponseEntity<Tag>(this.tagService.updateTag(tag), HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<HttpStatus> deleteTag(@PathVariable int id) {
		tagService.deleteTag(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
