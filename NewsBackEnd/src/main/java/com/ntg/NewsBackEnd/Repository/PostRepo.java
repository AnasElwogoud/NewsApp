package com.ntg.NewsBackEnd.Repository;

import com.ntg.NewsBackEnd.Entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Transactional
@Repository
public interface PostRepo extends JpaRepository<Post,Long> {
  @Query(value = "SELECT * FROM posts WHERE category = :category",nativeQuery = true)
  List<Post> findByCategory(@Param("category") String category);


List<Post> findAllByUserName(String userName);

}
