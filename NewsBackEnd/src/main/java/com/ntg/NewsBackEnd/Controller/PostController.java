package com.ntg.NewsBackEnd.Controller;

import com.ntg.NewsBackEnd.DTO.PostDto;

import com.ntg.NewsBackEnd.Entities.Post;
import com.ntg.NewsBackEnd.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/rest/posts")
public class PostController {

  @Autowired
  PostService postService;

  @PreAuthorize("hasRole('Jour') || hasRole('Admin')")
  @PostMapping(value = "/add",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public void createPost(@ModelAttribute PostDto postDto,
                                      @RequestParam("image") MultipartFile file) throws IOException {
    postService.createPost(postDto,file);
  }

  @GetMapping("/all")
  public ResponseEntity<List<PostDto>> showAllPosts() {
    return new ResponseEntity<>(postService.showAllPosts(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<PostDto> getSinglePost(@PathVariable Long id) {
    return new ResponseEntity<>(postService.readSinglePost(id), HttpStatus.OK);
  }

  @GetMapping("/")
  public List<Post> getAllPostsByUserName(@RequestParam String userName){
    return postService.getAllPostsByUserName(userName);
  }
  @GetMapping("/business")
  public List<Post> findByCategoryBusiness(){
    return postService.findByCategory("business");
  }
  @GetMapping("/entertain")
  public List<Post> findByCategoryEntertain(){
    return postService.findByCategory("entertainment");
  }
  @GetMapping("/health")
  public List<Post> findByCategoryHealth(){
    return postService.findByCategory("health");
  }
  @GetMapping("/sports")
  public List<Post> findByCategorySports(){
    return postService.findByCategory("sports");
  }
  @GetMapping("/science")
  public List<Post> findByCategoryScience(){
    return postService.findByCategory("science");
  }
  @GetMapping("/techno")
  public List<Post> findByCategoryTechno(){
      return postService.findByCategory("technology");
  }
  @GetMapping("/economy")
  public List<Post> findByCategoryEconomy(){
    return postService.findByCategory("economy");
  }

}
