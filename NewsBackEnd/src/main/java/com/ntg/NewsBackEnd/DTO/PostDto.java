package com.ntg.NewsBackEnd.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostDto {
  private Long id;
  private String content;
  private String title;
  private String userName;
  private String category;
  private String createdOn;
  private String filePath;

}
