package com.ntg.NewsBackEnd.Services;

import com.ntg.NewsBackEnd.DTO.PostDto;
import com.ntg.NewsBackEnd.Entities.Post;
import com.ntg.NewsBackEnd.Exception.PostNotFoundException;
import com.ntg.NewsBackEnd.Repository.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class PostService {
@Autowired
  UserService userService;
@Autowired
  PostRepo postRepo;

  @Transactional
  public void createPost(PostDto postDto,MultipartFile file) throws IOException {
    Post post=mapFromDtoToPost(postDto,file);
    postRepo.save(post);
  }

  @Transactional
  public List<PostDto> showAllPosts() {
    List<Post> posts=postRepo.findAll();
    return posts.stream().map(this::mapFromPostToDto).collect(toList());
  }

  @Transactional
  public PostDto readSinglePost(Long id) {
    Post post = postRepo.findById(id).orElseThrow(() -> new PostNotFoundException("For id " + id));
    return mapFromPostToDto(post);
  }

  public List<Post> findByCategory(String category) {
    return postRepo.findByCategory(category);
  }

  public List<Post> getAllPostsByUserName(String userName) {
    return postRepo.findAllByUserName(userName);
  }

  private PostDto mapFromPostToDto(Post post) {
    PostDto postDto = new PostDto();
    postDto.setId(post.getId());
    postDto.setTitle(post.getTitle());
    postDto.setContent(post.getContent());
    postDto.setUserName(post.getUserName());
    postDto.setCategory(post.getCategory());
    postDto.setCreatedOn(String.valueOf(post.getCreatedOn()));
    postDto.setFilePath(post.getFilePath());
    return postDto;
  }

  private Post mapFromDtoToPost(PostDto postDto,MultipartFile file) throws IOException {
    Post post = new Post();
    post.setTitle(postDto.getTitle());
    post.setContent(postDto.getContent());
    User loggedInUser = userService.getCurrentUser().orElseThrow(() -> new IllegalArgumentException("User Not Found"));
    post.setCreatedOn(LocalDate.now());
    post.setCategory(postDto.getCategory());
    post.setUserName(loggedInUser.getUsername());
    String FOLDER_PATH = "H:/Learn/WebDevelopment/NewsApp-2/src/assets/uploaded";
//    String FOLDER_PATH = "Z:/NTG/NewsApp-2/src/assets/uploaded/";
    String filePath=FOLDER_PATH + file.getOriginalFilename();
    file.transferTo(new File(filePath));
    post.setFilePath(file.getOriginalFilename());
    return post;
  }
}
